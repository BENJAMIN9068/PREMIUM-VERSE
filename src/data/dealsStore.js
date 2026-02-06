// Deals Store - Today's Deals with conditional offers
import { ProductStore } from './productStore';

// Sample deals data
const sampleDeals = [
    {
        id: 1,
        product_id: 1,
        product_name: 'YouTube Premium',
        product_image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
        category: 'ott',
        original_price: 299,
        deal_price: 0, // FREE!
        min_purchase_amount: 500, // Need to shop ₹500 to unlock
        description: 'Get YouTube Premium FREE when you shop for ₹500 or more!',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        is_active: true,
        is_featured: true,
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        product_id: 2,
        product_name: 'Spotify Premium',
        product_image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
        category: 'ott',
        original_price: 199,
        deal_price: 49,
        min_purchase_amount: 300,
        description: 'Spotify Premium at just ₹49 when you shop for ₹300+',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_active: true,
        is_featured: false,
        created_at: new Date().toISOString()
    },
    {
        id: 3,
        product_id: 3,
        product_name: 'ChatGPT Plus',
        product_image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        category: 'ai_tools',
        original_price: 1999,
        deal_price: 999,
        min_purchase_amount: 0, // No minimum purchase
        description: '50% OFF on ChatGPT Plus - No minimum purchase!',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_active: true,
        is_featured: true,
        created_at: new Date().toISOString()
    }
];

// LocalStorage key
const DEALS_KEY = 'premiumverse_deals';

// Load from localStorage or use sample data
const loadDeals = () => {
    try {
        const stored = localStorage.getItem(DEALS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading deals:', e);
    }
    return sampleDeals;
};

// Save to localStorage
const saveDeals = (deals) => {
    try {
        localStorage.setItem(DEALS_KEY, JSON.stringify(deals));
    } catch (e) {
        console.error('Error saving deals:', e);
    }
};

// Initialize deals
let deals = loadDeals();
let subscribers = [];

// Deals Store
export const DealsStore = {
    // Get all deals (for admin)
    getAllDeals: () => [...deals],

    // Get active deals only (for public page)
    getActiveDeals: () => {
        const today = new Date().toISOString().split('T')[0];
        return deals.filter(deal =>
            deal.is_active &&
            deal.start_date <= today &&
            deal.end_date >= today
        );
    },

    // Get featured deals
    getFeaturedDeals: () => {
        return DealsStore.getActiveDeals().filter(d => d.is_featured);
    },

    // Get single deal
    getDealById: (id) => deals.find(d => d.id === id),

    // Add new deal
    addDeal: (dealData) => {
        const newDeal = {
            ...dealData,
            id: Date.now(),
            created_at: new Date().toISOString()
        };
        deals = [newDeal, ...deals];
        saveDeals(deals);
        notifySubscribers();
        return newDeal;
    },

    // Update deal
    updateDeal: (id, updates) => {
        deals = deals.map(d => d.id === id ? { ...d, ...updates } : d);
        saveDeals(deals);
        notifySubscribers();
    },

    // Delete deal
    deleteDeal: (id) => {
        deals = deals.filter(d => d.id !== id);
        saveDeals(deals);
        notifySubscribers();
    },

    // Toggle active status
    toggleActive: (id) => {
        deals = deals.map(d => d.id === id ? { ...d, is_active: !d.is_active } : d);
        saveDeals(deals);
        notifySubscribers();
    },

    // Toggle featured status
    toggleFeatured: (id) => {
        deals = deals.map(d => d.id === id ? { ...d, is_featured: !d.is_featured } : d);
        saveDeals(deals);
        notifySubscribers();
    },

    // Subscribe to changes
    subscribe: (callback) => {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(cb => cb !== callback);
        };
    }
};

// Notify all subscribers
const notifySubscribers = () => {
    subscribers.forEach(cb => cb(deals));
};

// Helper: Calculate savings
export const calculateDealSavings = (deal) => {
    const savings = deal.original_price - deal.deal_price;
    const percentage = deal.original_price > 0
        ? Math.round((savings / deal.original_price) * 100)
        : 0;
    return { savings, percentage };
};

// Helper: Format deal condition text
export const getDealConditionText = (deal) => {
    if (deal.min_purchase_amount <= 0) {
        return null; // No condition
    }
    return `🛒 Shop ₹${deal.min_purchase_amount}+ to unlock`;
};

// Helper: Check if deal is expiring soon (within 24 hours)
export const isDealExpiringSoon = (deal) => {
    const endDate = new Date(deal.end_date);
    const now = new Date();
    const hoursRemaining = (endDate - now) / (1000 * 60 * 60);
    return hoursRemaining <= 24 && hoursRemaining > 0;
};

export default DealsStore;
