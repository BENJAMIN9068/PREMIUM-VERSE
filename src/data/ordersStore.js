// Orders Store - Order tracking with profit calculation
// Uses localStorage for persistence

const STORAGE_KEY = 'pv_admin_orders';
const DAILY_SALES_KEY = 'pv_daily_sales';

// Generate order number
const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${year}${month}-${random}`;
};

// Get today's date string
const getTodayString = () => new Date().toISOString().split('T')[0];

// Sample orders for demonstration
const generateSampleOrders = () => {
    const statuses = ['Completed', 'Processing', 'Pending', 'Cancelled'];
    const paymentStatuses = ['Paid', 'Pending', 'Failed'];
    const products = [
        { name: 'Netflix Premium', category: 'ott', providerCost: 150, sellingPrice: 299 },
        { name: 'ChatGPT Plus', category: 'ai_tools', providerCost: 180, sellingPrice: 299 },
        { name: 'Spotify Premium', category: 'music', providerCost: 30, sellingPrice: 49 },
        { name: 'Windows 11 Pro', category: 'software_keys', providerCost: 250, sellingPrice: 399 },
        { name: 'NordVPN', category: 'vpn', providerCost: 60, sellingPrice: 99 },
        { name: 'Canva Pro', category: 'editing', providerCost: 60, sellingPrice: 99 },
        { name: 'Office 365', category: 'software_keys', providerCost: 150, sellingPrice: 249 },
        { name: 'Adobe CC', category: 'editing', providerCost: 600, sellingPrice: 999 }
    ];

    const orders = [];
    const now = new Date();

    // Generate orders for last 30 days
    for (let i = 0; i < 150; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const orderDate = new Date(now);
        orderDate.setDate(orderDate.getDate() - daysAgo);
        orderDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.random() > 0.9 ? 2 : 1;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentStatus = status === 'Completed' ? 'Paid' : paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

        orders.push({
            id: `order_${Date.now()}_${i}`,
            order_number: generateOrderNumber(),
            customer_name: `Customer ${i + 1}`,
            customer_email: `customer${i + 1}@email.com`,
            product_id: `prod_${i}`,
            product_name: product.name,
            category: product.category,
            quantity,
            provider_cost: product.providerCost,
            selling_price: product.sellingPrice,
            profit_earned: (product.sellingPrice - product.providerCost) * quantity,
            total_amount: product.sellingPrice * quantity,
            order_status: status,
            payment_status: paymentStatus,
            order_date: orderDate.toISOString()
        });
    }

    return orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
};

// Initialize orders
const initializeOrders = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored orders:', e);
        }
    }
    const orders = generateSampleOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return orders;
};

// Orders Store Class
class OrdersStoreClass {
    constructor() {
        this.orders = initializeOrders();
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.orders));
    }

    persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders));
        this.notify();
    }

    // Get all orders (admin only)
    getAllOrders() {
        return [...this.orders];
    }

    // Get orders by date range
    getOrdersByDateRange(startDate, endDate) {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);

        return this.orders.filter(order => {
            const orderDate = new Date(order.order_date).getTime();
            return orderDate >= start && orderDate <= end;
        });
    }

    // Get today's orders
    getTodayOrders() {
        const today = getTodayString();
        return this.orders.filter(o => o.order_date.startsWith(today));
    }

    // Get this week's orders
    getThisWeekOrders() {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        return this.orders.filter(o => new Date(o.order_date) >= weekStart);
    }

    // Get this month's orders
    getThisMonthOrders() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        return this.orders.filter(o => new Date(o.order_date) >= monthStart);
    }

    // Calculate stats for order set
    calculateStats(orders) {
        const completed = orders.filter(o => o.order_status === 'Completed' && o.payment_status === 'Paid');
        const totalRevenue = completed.reduce((sum, o) => sum + o.total_amount, 0);
        const totalCost = completed.reduce((sum, o) => sum + (o.provider_cost * o.quantity), 0);
        const totalProfit = completed.reduce((sum, o) => sum + o.profit_earned, 0);
        const avgMargin = totalCost > 0 ? ((totalProfit / totalCost) * 100) : 0;

        return {
            totalOrders: orders.length,
            completedOrders: completed.length,
            totalRevenue: Math.round(totalRevenue),
            totalCost: Math.round(totalCost),
            totalProfit: Math.round(totalProfit),
            avgMargin: Math.round(avgMargin * 100) / 100
        };
    }

    // Get today's stats
    getTodayStats() {
        return this.calculateStats(this.getTodayOrders());
    }

    // Get this week's stats
    getThisWeekStats() {
        return this.calculateStats(this.getThisWeekOrders());
    }

    // Get this month's stats
    getThisMonthStats() {
        return this.calculateStats(this.getThisMonthOrders());
    }

    // Get daily sales data for charts (last N days)
    getDailySalesData(days = 30) {
        const now = new Date();
        const data = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayOrders = this.orders.filter(o =>
                o.order_date.startsWith(dateStr) &&
                o.order_status === 'Completed' &&
                o.payment_status === 'Paid'
            );

            const revenue = dayOrders.reduce((sum, o) => sum + o.total_amount, 0);
            const profit = dayOrders.reduce((sum, o) => sum + o.profit_earned, 0);

            data.push({
                date: dateStr,
                label: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                revenue: Math.round(revenue),
                profit: Math.round(profit),
                orders: dayOrders.length
            });
        }

        return data;
    }

    // Get revenue by category
    getCategoryRevenue() {
        const completed = this.orders.filter(o =>
            o.order_status === 'Completed' && o.payment_status === 'Paid'
        );

        const categoryData = {};
        completed.forEach(order => {
            const cat = order.category || 'other';
            if (!categoryData[cat]) {
                categoryData[cat] = { revenue: 0, profit: 0, count: 0 };
            }
            categoryData[cat].revenue += order.total_amount;
            categoryData[cat].profit += order.profit_earned;
            categoryData[cat].count++;
        });

        return Object.entries(categoryData).map(([category, data]) => ({
            category,
            ...data
        }));
    }

    // Get top selling products
    getTopProducts(limit = 10) {
        const completed = this.orders.filter(o =>
            o.order_status === 'Completed' && o.payment_status === 'Paid'
        );

        const productData = {};
        completed.forEach(order => {
            const key = order.product_name;
            if (!productData[key]) {
                productData[key] = { name: key, revenue: 0, profit: 0, unitsSold: 0 };
            }
            productData[key].revenue += order.total_amount;
            productData[key].profit += order.profit_earned;
            productData[key].unitsSold += order.quantity;
        });

        return Object.values(productData)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit);
    }

    // Get monthly profit margins (last 6 months)
    getMonthlyMargins(months = 6) {
        const now = new Date();
        const data = [];

        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

            const monthOrders = this.orders.filter(o => {
                const orderDate = new Date(o.order_date);
                return orderDate >= date && orderDate <= monthEnd &&
                    o.order_status === 'Completed' && o.payment_status === 'Paid';
            });

            const revenue = monthOrders.reduce((sum, o) => sum + o.total_amount, 0);
            const cost = monthOrders.reduce((sum, o) => sum + (o.provider_cost * o.quantity), 0);
            const margin = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;

            data.push({
                month: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
                revenue: Math.round(revenue),
                cost: Math.round(cost),
                profit: Math.round(revenue - cost),
                margin: Math.round(margin * 100) / 100
            });
        }

        return data;
    }

    // Create new order
    createOrder(orderData) {
        const newOrder = {
            ...orderData,
            id: `order_${Date.now()}`,
            order_number: generateOrderNumber(),
            order_date: new Date().toISOString()
        };

        this.orders.unshift(newOrder);
        this.persist();
        return newOrder;
    }

    // Update order status
    updateOrderStatus(id, status) {
        const order = this.orders.find(o => o.id === id);
        if (order) {
            order.order_status = status;
            this.persist();
        }
        return order;
    }

    // Recent orders
    getRecentOrders(limit = 10) {
        return this.orders.slice(0, limit);
    }

    // Reset
    reset() {
        localStorage.removeItem(STORAGE_KEY);
        this.orders = generateSampleOrders();
        this.persist();
    }
}

// Singleton instance
export const OrdersStore = new OrdersStoreClass();
