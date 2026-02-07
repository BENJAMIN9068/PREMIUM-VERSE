import json
import os
from datetime import datetime

# Mock API endpoints (simulated)
PROVIDERS = {
    'list1': {
        'contact': '+91 721 782 9284',
        'source': 'WhatsApp - List 1',
        'data_file': 'backend/data/list1_prices.json'
    },
    'list2': {
        'contact': '+91 84079 83973',
        'source': 'WhatsApp - List 2',
        'data_file': 'backend/data/list2_prices.json'
    },
    'websites': {
        'DigiWorld4u': {'url': 'https://digiworld4u.in/', 'price_modifier': 1.1}, # Mock modifier
        'PremiumAtCheap': {'url': 'https://premiumatcheap.in/', 'price_modifier': 1.2}
    }
}

def load_json(filepath):
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return []

def get_website_prices(product_name):
    # Mock website scraping logic
    prices = []
    base_price = 40 # Mock base price
    for name, data in PROVIDERS['websites'].items():
        # Simulate different prices
        import random
        price = base_price * data['price_modifier'] + random.randint(-5, 5)
        prices.append({
            'price': round(price, 2),
            'provider': name,
            'contact': data['url'],
            'type': f'Website - {name}'
        })
    return prices

def sync_prices():
    print("Starting price sync...")
    
    all_products = {}
    
    # 1. Load List 1
    list1_data = load_json(PROVIDERS['list1']['data_file'])
    for p in list1_data:
        key = f"{p['name']}_{p['validity']}"
        if key not in all_products: all_products[key] = []
        all_products[key].append({
            'price': p['price'],
            'contact': PROVIDERS['list1']['contact'],
            'type': PROVIDERS['list1']['source'],
            'availability': p['availability']
        })

    # 2. Load List 2
    list2_data = load_json(PROVIDERS['list2']['data_file'])
    for p in list2_data:
        key = f"{p['name']}_{p['validity']}"
        if key not in all_products: all_products[key] = []
        all_products[key].append({
            'price': p['price'],
            'contact': PROVIDERS['list2']['contact'],
            'type': PROVIDERS['list2']['source'],
            'availability': p['availability']
        })

    # 3. Process and find lowest
    updated_products = []
    
    for key, offers in all_products.items():
        name, validity = key.split('_')
        
        # Add website prices (mock)
        website_offers = get_website_prices(name)
        offers.extend(website_offers)
        
        # Find lowest price
        if not offers: continue
        
        lowest = min(offers, key=lambda x: x['price'])
        
        updated_products.append({
            'product_name': name,
            'validity': validity,
            'provider_cost': lowest['price'],
            'provider_contact': lowest['contact'],
            'provider_source': lowest['type'],
            'last_updated': datetime.now().isoformat()
        })
        
        print(f"Updated {name} ({validity}): Lowest price {lowest['price']} from {lowest['type']}")

    # In a real scenario, this would POST to an API or update a DB
    # For now, we'll just save to a result file
    with open('backend/data/synced_prices.json', 'w') as f:
        json.dump(updated_products, f, indent=2)
        
    print(f"Sync complete. {len(updated_products)} products processed.")

if __name__ == "__main__":
    # Ensure run from project root
    if not os.path.exists('backend'):
        print("Please run from project root directory")
    else:
        sync_prices()
