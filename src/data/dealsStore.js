// Deals Store - Today's Deals with conditional offers
import { ProductStore } from './productStore';

// LocalStorage key
const DEALS_KEY = 'premiumverse_deals';

// Load from localStorage (no sample data)
const loadDeals = () => {
    try {
        const stored = localStorage.getItem(DEALS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading deals:', e);
    }
    return []; // Start with empty deals
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
