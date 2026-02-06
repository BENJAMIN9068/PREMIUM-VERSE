import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ShoppingBag, IndianRupee, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SpaceBackground from '../../components/ui/SpaceBackground';
import DashboardStatCard from '../../components/dashboard/DashboardStatCard';
import CategorySection from '../../components/dashboard/CategorySection';
import OrderCard from '../../components/dashboard/OrderCard';
import ExpiryAlert from '../../components/dashboard/ExpiryAlert';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/mockUserData'; // Keep categories for structure if needed, or move to constants
import { OrdersStore } from '../../data/ordersStore';

const UserDashboardPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [orderFilter, setOrderFilter] = useState('all');
    const [showExpiredAlert, setShowExpiredAlert] = useState(true);
    const [showExpiringAlert, setShowExpiringAlert] = useState(true);
    const [expandOrders, setExpandOrders] = useState(false);

    useEffect(() => {
        if (user?.email) {
            setOrders(OrdersStore.getOrdersByUserEmail(user.email));
        }
    }, [user]);

    // Calculate real stats based on orders
    const stats = useMemo(() => {
        const activeCount = orders.filter(o => o.status === 'Completed').length; // Assuming completed orders are active subs for now
        const totalSpent = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);

        return {
            activeCount,
            expiringCount: 0, // No real expiry tracking yet without detailed sub logic
            totalOrders: orders.length,
            totalSpent
        };
    }, [orders]);

    const activeSubscriptions = []; // Placeholder until sub logic is separate from orders

    const filteredOrders = useMemo(() => {
        if (orderFilter === 'all') return orders;
        return orders.filter(order => order.status === orderFilter);
    }, [orders, orderFilter]);

    // Only show first 5 orders unless expanded
    const displayedOrders = expandOrders ? filteredOrders : filteredOrders.slice(0, 5);

    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Grouping logic (placeholder)
    const groupedSubscriptions = {};
    const categoriesWithSubs = [];
    const emptyCategories = CATEGORIES;

    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceBackground />
            <div className="relative z-10">
                <Navbar />

                <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Alerts removed for now as no mock expiry data */}

                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
                            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{user?.name || 'User'}</span>!
                        </h1>
                        <p className="text-gray-400">Manage your subscriptions and orders</p>
                        <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                        <DashboardStatCard
                            title="Active Subscriptions"
                            value={stats.activeCount}
                            subtext="Currently running"
                            icon={CheckCircle2}
                            color="success"
                            delay={0.1}
                        />
                        <DashboardStatCard
                            title="Expiring Soon"
                            value={stats.expiringCount}
                            subtext="Within 7 days"
                            icon={AlertTriangle}
                            color={stats.expiringCount > 0 ? 'warning' : 'success'}
                            delay={0.2}
                        />
                        <DashboardStatCard
                            title="Total Orders"
                            value={stats.totalOrders}
                            subtext="All time"
                            icon={ShoppingBag}
                            color="primary"
                            delay={0.3}
                        />
                        <DashboardStatCard
                            title="Total Spent"
                            value={`₹${stats.totalSpent.toLocaleString('en-IN')}`}
                            subtext="Lifetime"
                            icon={IndianRupee}
                            color="primary"
                            delay={0.4}
                        />
                    </div>

                    {/* Subscription Categories with Data */}
                    {categoriesWithSubs.map((category, index) => (
                        <CategorySection
                            key={category.id}
                            category={category}
                            subscriptions={groupedSubscriptions[category.id] || []}
                            index={index}
                        />
                    ))}

                    {/* Empty Categories (collapsed) */}
                    {emptyCategories.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-12"
                        >
                            <h3 className="text-lg font-medium text-gray-400 mb-4">Other Categories</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {emptyCategories.map((cat) => (
                                    <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center opacity-60 hover:opacity-100 transition-opacity">
                                        <span className="text-2xl block mb-2">{cat.icon}</span>
                                        <p className="text-xs text-gray-400">{cat.name}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Order History Section */}
                    <section className="mt-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📦</span>
                                <h2 className="text-xl font-bold text-white font-display">Order History</h2>
                                <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full">
                                    {filteredOrders.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-gray-400" />
                                <select
                                    value={orderFilter}
                                    onChange={(e) => setOrderFilter(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                >
                                    <option value="all">All Orders</option>
                                    <option value="completed">Completed</option>
                                    <option value="processing">Processing</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {displayedOrders.map((order, index) => (
                                <OrderCard key={order.id} order={order} index={index} />
                            ))}
                        </div>

                        {filteredOrders.length > 5 && (
                            <button
                                onClick={() => setExpandOrders(!expandOrders)}
                                className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                {expandOrders ? (
                                    <>Show Less <ChevronUp size={16} /></>
                                ) : (
                                    <>View All {filteredOrders.length} Orders <ChevronDown size={16} /></>
                                )}
                            </button>
                        )}

                        {filteredOrders.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No orders found with this filter.
                            </div>
                        )}
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default UserDashboardPage;
