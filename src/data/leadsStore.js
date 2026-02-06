// Customer Leads Store - Save all registered customers
// Customer IDs start from 2024001

const LEADS_KEY = 'premiumverse_leads';
const LAST_ID_KEY = 'premiumverse_last_customer_id';

// Load leads from localStorage
const loadLeads = () => {
    try {
        const stored = localStorage.getItem(LEADS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading leads:', e);
    }
    return [];
};

// Save leads to localStorage
const saveLeads = (leads) => {
    try {
        localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    } catch (e) {
        console.error('Error saving leads:', e);
    }
};

// Get next customer ID (starts from 2024001)
const getNextCustomerId = () => {
    try {
        const lastId = localStorage.getItem(LAST_ID_KEY);
        const nextId = lastId ? parseInt(lastId) + 1 : 2024001;
        localStorage.setItem(LAST_ID_KEY, nextId.toString());
        return nextId;
    } catch (e) {
        return 2024001;
    }
};

// Initialize leads
let leads = loadLeads();
let subscribers = [];

// Leads Store
export const LeadsStore = {
    // Get all leads
    getAllLeads: () => [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    // Get lead by ID
    getLeadById: (customerId) => leads.find(l => l.customer_id === customerId),

    // Get lead by email
    getLeadByEmail: (email) => leads.find(l => l.email.toLowerCase() === email.toLowerCase()),

    // Add new lead (called when user registers)
    addLead: (userData) => {
        // Check if email already exists
        const existing = LeadsStore.getLeadByEmail(userData.email);
        if (existing) {
            // Update existing lead
            return LeadsStore.updateLead(existing.customer_id, userData);
        }

        const newLead = {
            customer_id: getNextCustomerId(),
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            country_code: userData.countryCode || '+91',
            street: userData.street || userData.address?.street || '',
            city: userData.city || userData.address?.city || '',
            state: userData.state || userData.address?.state || '',
            pincode: userData.pincode || userData.address?.pincode || '',
            country: userData.country || userData.address?.country || 'India',
            auth_provider: userData.authProvider || 'email',
            google_id: userData.googleId || null,
            picture: userData.picture || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_address_complete: userData.isAddressComplete || false
        };

        leads = [newLead, ...leads];
        saveLeads(leads);
        notifySubscribers();
        return newLead;
    },

    // Update lead
    updateLead: (customerId, updates) => {
        leads = leads.map(lead => {
            if (lead.customer_id === customerId) {
                return {
                    ...lead,
                    ...updates,
                    updated_at: new Date().toISOString()
                };
            }
            return lead;
        });
        saveLeads(leads);
        notifySubscribers();
        return leads.find(l => l.customer_id === customerId);
    },

    // Update lead by email
    updateLeadByEmail: (email, updates) => {
        const lead = LeadsStore.getLeadByEmail(email);
        if (lead) {
            return LeadsStore.updateLead(lead.customer_id, updates);
        }
        return null;
    },

    // Delete lead
    deleteLead: (customerId) => {
        leads = leads.filter(l => l.customer_id !== customerId);
        saveLeads(leads);
        notifySubscribers();
    },

    // Get total count
    getTotalCount: () => leads.length,

    // Get stats
    getStats: () => {
        const today = new Date().toISOString().split('T')[0];
        const thisMonth = new Date().toISOString().slice(0, 7);

        return {
            total: leads.length,
            today: leads.filter(l => l.created_at.startsWith(today)).length,
            thisMonth: leads.filter(l => l.created_at.startsWith(thisMonth)).length,
            google: leads.filter(l => l.auth_provider === 'google').length,
            email: leads.filter(l => l.auth_provider === 'email').length,
            withAddress: leads.filter(l => l.is_address_complete).length
        };
    },

    // Subscribe to changes
    subscribe: (callback) => {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(cb => cb !== callback);
        };
    }
};

// Notify subscribers
const notifySubscribers = () => {
    subscribers.forEach(cb => cb(leads));
};

export default LeadsStore;
