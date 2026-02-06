// Analytics Service - Aggregated analytics for dashboard
// Combines data from ProductStore and OrdersStore

import { ProductStore } from '../data/productStore';
import { OrdersStore } from '../data/ordersStore';

// Category display names
const CATEGORY_NAMES = {
    ott: 'Streaming',
    music: 'Music',
    ai_tools: 'AI Tools',
    software_keys: 'Software',
    editing: 'Editing',
    cloud: 'Cloud',
    vpn: 'VPN',
    antivirus: 'Security',
    gaming: 'Gaming',
    productivity: 'Productivity',
    education: 'Education',
    other: 'Other'
};

// Chart colors
export const CHART_COLORS = {
    primary: '#0EA5E9',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    categories: [
        '#0EA5E9', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
        '#6366F1', '#14B8A6', '#F97316', '#EF4444', '#84CC16', '#06B6D4'
    ]
};

class AnalyticsServiceClass {
    // Get dashboard summary stats
    getDashboardStats() {
        const productStats = ProductStore.getStats();
        const todayStats = OrdersStore.getTodayStats();
        const weekStats = OrdersStore.getThisWeekStats();
        const monthStats = OrdersStore.getThisMonthStats();
        const topProducts = OrdersStore.getTopProducts(1);
        const bestSeller = topProducts[0] || null;

        return {
            today: {
                sales: todayStats.totalRevenue,
                profit: todayStats.totalProfit,
                margin: todayStats.avgMargin,
                orders: todayStats.completedOrders
            },
            month: {
                revenue: monthStats.totalRevenue,
                profit: monthStats.totalProfit,
                margin: monthStats.avgMargin,
                orders: monthStats.completedOrders
            },
            products: {
                total: productStats.total,
                active: productStats.active,
                outOfStock: productStats.outOfStock,
                featured: productStats.featured
            },
            bestSeller: bestSeller ? {
                name: bestSeller.name,
                unitsSold: bestSeller.unitsSold,
                revenue: bestSeller.revenue
            } : null
        };
    }

    // Get sales & profit trend data for line chart
    getSalesTrendData(days = 30) {
        return OrdersStore.getDailySalesData(days);
    }

    // Get category revenue data for pie/doughnut chart
    getCategoryRevenueData() {
        const rawData = OrdersStore.getCategoryRevenue();
        const total = rawData.reduce((sum, item) => sum + item.revenue, 0);

        return rawData.map((item, index) => ({
            name: CATEGORY_NAMES[item.category] || item.category,
            value: item.revenue,
            profit: item.profit,
            count: item.count,
            percentage: total > 0 ? Math.round((item.revenue / total) * 100) : 0,
            color: CHART_COLORS.categories[index % CHART_COLORS.categories.length]
        })).sort((a, b) => b.value - a.value);
    }

    // Get top products data for bar chart
    getTopProductsData(limit = 10) {
        return OrdersStore.getTopProducts(limit).map((product, index) => ({
            name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
            fullName: product.name,
            revenue: product.revenue,
            profit: product.profit,
            units: product.unitsSold,
            color: CHART_COLORS.categories[index % CHART_COLORS.categories.length]
        }));
    }

    // Get monthly profit margins for bar chart
    getMonthlyMarginsData(months = 6) {
        return OrdersStore.getMonthlyMargins(months).map(item => ({
            ...item,
            color: item.margin >= 40 ? CHART_COLORS.success :
                item.margin >= 20 ? CHART_COLORS.warning :
                    CHART_COLORS.error
        }));
    }

    // Get recent orders with profit info
    getRecentOrders(limit = 5) {
        return OrdersStore.getRecentOrders(limit).map(order => ({
            id: order.id,
            orderNumber: order.order_number,
            customer: order.customer_name,
            product: order.product_name,
            amount: order.total_amount,
            profit: order.profit_earned,
            status: order.order_status,
            date: new Date(order.order_date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        }));
    }

    // Get profit distribution summary
    getProfitDistribution() {
        const products = ProductStore.getAllProducts();

        const distribution = {
            high: products.filter(p => p.profit_percentage >= 40).length,
            medium: products.filter(p => p.profit_percentage >= 20 && p.profit_percentage < 40).length,
            low: products.filter(p => p.profit_percentage >= 0 && p.profit_percentage < 20).length,
            loss: products.filter(p => p.profit_percentage < 0).length
        };

        return distribution;
    }

    // Format currency for display
    formatCurrency(amount) {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(1)}K`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
    }

    // Format percentage
    formatPercentage(value) {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    }
}

// Singleton
export const AnalyticsService = new AnalyticsServiceClass();
