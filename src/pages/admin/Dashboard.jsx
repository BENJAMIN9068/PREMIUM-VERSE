// Enhanced Admin Dashboard with Profit Analytics
import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Calendar, RefreshCcw, TrendingUp, Package, Star, ShoppingBag, DollarSign } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import Button from '../../components/ui/Button';
import { AnalyticsService, CHART_COLORS } from '../../services/analyticsService';
import { ProductStore } from '../../data/productStore';

// Stat Card Component
const StatCard = ({ title, value, subtext, trend, trendValue, icon: Icon, iconColor = 'text-gray-400' }) => (
    <div className="bg-[#1a1a1a]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'text-success bg-success/10' : 'text-error bg-error/10'}`}>
                    {trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                    {trendValue}
                </span>
            )}
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl md:text-3xl font-bold text-white mb-2">{value}</p>
        <p className="text-xs text-gray-500">{subtext}</p>
    </div>
);

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-gray-400 text-xs mb-2">{label}</p>
                {payload.map((item, index) => (
                    <p key={index} className="text-sm font-medium" style={{ color: item.color }}>
                        {item.name}: ₹{item.value?.toLocaleString('en-IN')}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [monthlyMargins, setMonthlyMargins] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        setLoading(true);

        // Load all analytics data
        setTimeout(() => {
            setStats(AnalyticsService.getDashboardStats());
            setSalesData(AnalyticsService.getSalesTrendData(30));
            setCategoryData(AnalyticsService.getCategoryRevenueData());
            setTopProducts(AnalyticsService.getTopProductsData(10));
            setMonthlyMargins(AnalyticsService.getMonthlyMarginsData(6));
            setRecentOrders(AnalyticsService.getRecentOrders(5));
            setLoading(false);
        }, 300);
    };

    useEffect(() => {
        loadData();
    }, []);

    const formatCurrency = (amount) => {
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
        return `₹${amount?.toLocaleString('en-IN') || 0}`;
    };

    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white font-display">Sales Dashboard</h1>
                    <p className="text-gray-400 text-sm">Real-time overview of your store's performance & profits</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex bg-white/5 border border-white/10 rounded-lg p-1">
                        <button className="px-3 py-1.5 text-xs font-medium bg-white/10 text-white rounded-md shadow-sm">Today</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Week</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Month</button>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2" onClick={loadData}>
                        <RefreshCcw size={14} /> Refresh
                    </Button>
                </div>
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Today's Performance"
                    value={formatCurrency(stats.today.sales)}
                    subtext={`${stats.today.orders} orders • ${stats.today.margin.toFixed(1)}% margin`}
                    trend="up"
                    trendValue={`₹${stats.today.profit} profit`}
                    icon={DollarSign}
                    iconColor="text-success"
                />
                <StatCard
                    title="This Month"
                    value={formatCurrency(stats.month.revenue)}
                    subtext={`${stats.month.orders} orders completed`}
                    trend="up"
                    trendValue={`₹${formatCurrency(stats.month.profit).replace('₹', '')} profit`}
                    icon={Calendar}
                    iconColor="text-primary"
                />
                <StatCard
                    title="Products"
                    value={stats.products.total}
                    subtext={`${stats.products.active} active • ${stats.products.outOfStock} out of stock`}
                    icon={Package}
                    iconColor="text-secondary"
                />
                <StatCard
                    title="Best Seller Today"
                    value={stats.bestSeller?.name || 'No sales'}
                    subtext={stats.bestSeller ? `${stats.bestSeller.unitsSold} sold • ${formatCurrency(stats.bestSeller.revenue)}` : 'Start selling!'}
                    icon={Star}
                    iconColor="text-warning"
                />
            </section>

            {/* Charts Row 1 */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue & Profit Trend Chart */}
                <article className="lg:col-span-2 bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary" />
                        Sales & Profit Trend (30 Days)
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="label" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="profit" name="Profit" stroke={CHART_COLORS.success} strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                {/* Category Revenue Pie Chart */}
                <article className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue by Category</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ fontSize: '11px', color: '#999' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </article>
            </section>

            {/* Charts Row 2 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 10 Products Bar Chart */}
                <article className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Top 10 Best Selling Products</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={topProducts} margin={{ top: 0, right: 30, bottom: 0, left: 60 }}>
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#999"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    width={100}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
                                />
                                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={18}>
                                    {topProducts.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                {/* Monthly Profit Margins Bar Chart */}
                <article className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Monthly Profit Margins</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyMargins}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="month" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Margin']}
                                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
                                />
                                <Bar dataKey="margin" radius={[4, 4, 0, 0]} barSize={40}>
                                    {monthlyMargins.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </article>
            </section>

            {/* Recent Orders Table */}
            <article className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                <header className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShoppingBag size={20} className="text-primary" />
                        Recent Orders
                    </h3>
                    <Button size="sm" variant="ghost">View All</Button>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3 rounded-l-lg">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Profit</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 rounded-r-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{order.orderNumber}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.product}</td>
                                    <td className="px-6 py-4 text-white font-medium">₹{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.profit > 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                            }`}>
                                            {order.profit > 0 ? '+' : ''}₹{order.profit}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-success/10 text-success' :
                                                order.status === 'Processing' ? 'bg-primary/10 text-primary' :
                                                    order.status === 'Pending' ? 'bg-warning/10 text-warning' :
                                                        'bg-error/10 text-error'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    );
};

export default Dashboard;
