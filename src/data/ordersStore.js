// Orders Store - Manage customer orders
// Uses localStorage for persistence

const ORDERS_KEY = 'premiumverse_orders';

// Load orders from localStorage
const loadOrders = () => {
    try {
        const stored = localStorage.getItem(ORDERS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading orders:', e);
    }
    return [];
};

// Save orders to localStorage
const saveOrders = (orders) => {
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
        console.error('Error saving orders:', e);
    }
};

let orders = loadOrders();
let subscribers = [];

export const OrdersStore = {
    // Get all orders (admin)
    getAllOrders: () => [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    // Get orders by user email
    getOrdersByUserEmail: (email) => orders.filter(o => o.customer_email?.toLowerCase() === email?.toLowerCase())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    // Get order by ID
    getOrderById: (orderId) => orders.find(o => o.order_id === orderId),

    // Create new order
    createOrder: (orderData) => {
        const newOrder = {
            order_id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            ...orderData,
            status: 'Processing', // Default status
            payment_status: 'Completed', // Assuming payment is done
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        orders = [newOrder, ...orders];
        saveOrders(orders);
        notifySubscribers();
        return newOrder;
    },

    // Update order status
    updateOrderStatus: (orderId, status) => {
        orders = orders.map(order =>
            order.order_id === orderId
                ? { ...order, status, updated_at: new Date().toISOString() }
                : order
        );
        saveOrders(orders);
        notifySubscribers();
    },

    // Get total revenue
    getTotalRevenue: () => orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0),

    // Get stats
    getStats: () => {
        const today = new Date().toISOString().split('T')[0];
        const thisMonth = new Date().toISOString().slice(0, 7);

        return {
            totalOrders: orders.length,
            todayOrders: orders.filter(o => o.created_at.startsWith(today)).length,
            monthOrders: orders.filter(o => o.created_at.startsWith(thisMonth)).length,
            totalRevenue: orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0),
            pendingOrders: orders.filter(o => o.status === 'Pending').length,
            processingOrders: orders.filter(o => o.status === 'Processing').length,
            completedOrders: orders.filter(o => o.status === 'Completed').length
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

const notifySubscribers = () => {
    subscribers.forEach(cb => cb(orders));
};

export default OrdersStore;
