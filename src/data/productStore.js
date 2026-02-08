// Product Store - Enhanced product data with provider/profit tracking
// Uses localStorage for persistence

import { PRODUCTS, PRODUCT_CATEGORIES, LOGOS } from './products';

// Storage keys
const STORAGE_KEYS = {
    PRODUCTS: 'pv_admin_products',
    ORDERS: 'pv_admin_orders',
    DAILY_SALES: 'pv_daily_sales'
};

// Helper: Calculate profit metrics
export const calculateProfit = (providerCost, sellingPrice) => {
    const cost = parseFloat(providerCost) || 0;
    const price = parseFloat(sellingPrice) || 0;
    const profitAmount = price - cost;
    const profitPercentage = cost > 0 ? ((profitAmount / cost) * 100) : 0;

    return {
        profitAmount: Math.round(profitAmount * 100) / 100,
        profitPercentage: Math.round(profitPercentage * 100) / 100
    };
};

// Helper: Generate SKU
export const generateSKU = () => {
    const prefix = 'PV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
};

// Helper: Get profit status for color coding
export const getProfitStatus = (profitPercentage) => {
    if (profitPercentage < 0) return { status: 'loss', color: 'error', label: 'Loss' };
    if (profitPercentage < 20) return { status: 'low', color: 'warning', label: 'Low Margin' };
    if (profitPercentage < 40) return { status: 'medium', color: 'yellow', label: 'Medium' };
    return { status: 'high', color: 'success', label: 'Profitable' };
};

// Transform existing products to new format with sample provider data
const transformExistingProducts = () => {
    return PRODUCTS.map((product, index) => {
        // Estimate provider cost as 40-70% of selling price
        const providerCostRatio = 0.4 + Math.random() * 0.3;
        const providerCost = Math.round(product.price * providerCostRatio);
        const { profitAmount, profitPercentage } = calculateProfit(providerCost, product.price);

        const isWhatsApp = Math.random() > 0.5;

        return {
            id: product.id,
            product_name: product.name,
            category: product.category,
            validity: product.plan,
            description: `Premium ${product.name} subscription - ${product.plan}`,
            image_url: product.logo || '',
            provider_name: `Provider ${(index % 5) + 1}`,
            provider_cost: providerCost,
            provider_contact: isWhatsApp ? '+91 98765 43210' : 'https://example-provider.com',
            provider_source: isWhatsApp ? 'WhatsApp' : 'Website',
            last_updated: new Date().toISOString(),
            selling_price: product.price,
            original_price: product.originalPrice,
            profit_amount: profitAmount,
            profit_percentage: profitPercentage,
            stock_status: 'in_stock',
            is_active: true,
            is_featured: !!product.badge,
            badge: product.badge || null,
            sku: generateSKU(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    });
};

// Initialize products from localStorage or from existing data
const initializeProducts = () => {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored products:', e);
        }
    }
    // Initialize with transformed existing products
    const products = transformExistingProducts();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return products;
};

// Product Store Class
class ProductStoreClass {
    constructor() {
        this.products = initializeProducts();
        this.categories = PRODUCT_CATEGORIES;
        this.listeners = [];
    }

    // Subscribe to changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners
    notify() {
        this.listeners.forEach(listener => listener(this.products));
    }

    // Save to localStorage
    persist() {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
        this.notify();
    }

    // Get all products (admin - includes all fields)
    getAllProducts() {
        return [...this.products];
    }

    // Get public products (filtered - no provider/profit data)
    getPublicProducts() {
        return this.products
            .filter(p => p.is_active)
            .map(({
                id, product_name, category, validity, description, image_url,
                selling_price, original_price, stock_status, is_featured, badge
            }) => ({
                id,
                name: product_name,
                category,
                plan: validity,
                description,
                logo: image_url,
                price: selling_price,
                originalPrice: original_price,
                stock_status,
                is_featured,
                badge
            }));
    }

    // Get product by ID (admin)
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    // Get products by category
    getProductsByCategory(categoryId) {
        return this.products.filter(p => p.category === categoryId && p.is_active);
    }

    // Search products
    searchProducts(query) {
        const q = query.toLowerCase();
        return this.products.filter(p =>
            p.product_name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.provider_name.toLowerCase().includes(q)
        );
    }

    // Add new product
    addProduct(productData) {
        const { profitAmount, profitPercentage } = calculateProfit(
            productData.provider_cost,
            productData.selling_price
        );

        const newProduct = {
            ...productData,
            id: `prod_${Date.now()}`,
            sku: productData.sku || generateSKU(),
            profit_amount: profitAmount,
            profit_percentage: profitPercentage,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.products.unshift(newProduct);
        this.persist();
        return newProduct;
    }

    // Update product
    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        // Recalculate profit if prices changed
        const providerCost = updates.provider_cost ?? this.products[index].provider_cost;
        const sellingPrice = updates.selling_price ?? this.products[index].selling_price;
        const { profitAmount, profitPercentage } = calculateProfit(providerCost, sellingPrice);

        this.products[index] = {
            ...this.products[index],
            ...updates,
            profit_amount: profitAmount,
            profit_percentage: profitPercentage,
            updated_at: new Date().toISOString()
        };

        this.persist();
        return this.products[index];
    }

    // Delete product
    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.products.splice(index, 1);
        this.persist();
        return true;
    }

    // Toggle product active status
    toggleActive(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            product.is_active = !product.is_active;
            product.updated_at = new Date().toISOString();
            this.persist();
        }
        return product;
    }

    // Toggle featured status
    toggleFeatured(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            product.is_featured = !product.is_featured;
            product.updated_at = new Date().toISOString();
            this.persist();
        }
        return product;
    }

    // Get statistics
    getStats() {
        const total = this.products.length;
        const active = this.products.filter(p => p.is_active).length;
        const outOfStock = this.products.filter(p => p.stock_status === 'out_of_stock').length;
        const featured = this.products.filter(p => p.is_featured).length;
        const totalProfit = this.products.reduce((sum, p) => sum + p.profit_amount, 0);
        const avgMargin = this.products.length > 0
            ? this.products.reduce((sum, p) => sum + p.profit_percentage, 0) / this.products.length
            : 0;

        return {
            total,
            active,
            inactive: total - active,
            outOfStock,
            featured,
            totalProfit: Math.round(totalProfit * 100) / 100,
            avgMargin: Math.round(avgMargin * 100) / 100
        };
    }

    // Get category breakdown
    getCategoryBreakdown() {
        const breakdown = {};
        this.products.forEach(p => {
            if (!breakdown[p.category]) {
                breakdown[p.category] = { count: 0, revenue: 0, profit: 0 };
            }
            breakdown[p.category].count++;
            breakdown[p.category].revenue += p.selling_price;
            breakdown[p.category].profit += p.profit_amount;
        });
        return breakdown;
    }

    // Reset to default data
    reset() {
        localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
        this.products = transformExistingProducts();
        this.persist();
    }
}

// Singleton instance
export const ProductStore = new ProductStoreClass();

// Export categories and logos for convenience
export { PRODUCT_CATEGORIES, LOGOS };
