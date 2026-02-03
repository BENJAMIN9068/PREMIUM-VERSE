import { useState, useMemo } from 'react';
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
import {
    CATEGORIES,
    MOCK_SUBSCRIPTIONS,
    MOCK_ORDERS,
    calculateStats,
    getSubscriptionStatus,
    getSubscriptionsByCategory
} from '../../data/mockUserData';

const UserDashboardPage = () => {
    const { user } = useAuth();
    const [orderFilter, setOrderFilter] = useState('all');
    const [showExpiredAlert, setShowExpiredAlert] = useState(true);
    const [showExpiringAlert, setShowExpiringAlert] = useState(true);
    const [expandOrders, setExpandOrders] = useState(false);

    const stats = useMemo(() => calculateStats(MOCK_SUBSCRIPTIONS, MOCK_ORDERS), []);
    const groupedSubscriptions = useMemo(() => getSubscriptionsByCategory(MOCK_SUBSCRIPTIONS), []);

    const filteredOrders = useMemo(() => {
        if (orderFilter === 'all') return MOCK_ORDERS;
        return MOCK_ORDERS.filter(order => order.orderStatus === orderFilter);
    }, [orderFilter]);

    // Only show first 5 orders unless expanded
    const displayedOrders = expandOrders ? filteredOrders : filteredOrders.slice(0, 5);

    const expiredCount = MOCK_SUBSCRIPTIONS.filter(s => getSubscriptionStatus(s).isExpired).length;
    const expiringCount = stats.expiringCount;

    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Filter categories that have subscriptions (show them first), then empty ones
    const categoriesWithSubs = CATEGORIES.filter(cat => groupedSubscriptions[cat.id]?.length > 0);
    const emptyCategories = CATEGORIES.filter(cat => groupedSubscriptions[cat.id]?.length === 0);

    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceBackground />
            <div className="relative z-10">
                <Navbar />

                <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Alerts */}
                    {showExpiredAlert && expiredCount > 0 && (
                        <ExpiryAlert type="expired" count={expiredCount} onDismiss={() => setShowExpiredAlert(false)} />
                    )}
                    {showExpiringAlert && expiringCount > 0 && (
                        <ExpiryAlert type="warning" count={expiringCount} onDismiss={() => setShowExpiringAlert(false)} />
                    )}

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
