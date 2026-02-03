import { ArrowUp, ArrowDown, Calendar, RefreshCcw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Button from '../../components/ui/Button';

// Mock Data for Charts
const revenueData = [
    { name: 'Mon', value: 32450 },
    { name: 'Tue', value: 28900 },
    { name: 'Wed', value: 41200 },
    { name: 'Thu', value: 35670 },
    { name: 'Fri', value: 48230 },
    { name: 'Sat', value: 52100 },
    { name: 'Sun', value: 45780 },
];

const productPerformanceData = [
    { name: 'Netflix', value: 234 },
    { name: 'Win 11', value: 189 },
    { name: 'GPT Plus', value: 156 },
    { name: 'Norton', value: 145 },
    { name: 'Office', value: 132 },
];

const COLORS = ['#0EA5E9', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

const StatCard = ({ title, value, subtext, trend, trendValue, icon: Icon, delay }) => (
    <div className="bg-[#1a1a1a]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-primary/20 transition-colors">
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

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white font-display">Sales Dashboard</h1>
                    <p className="text-gray-400 text-sm">Overview of your store's performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex bg-white/5 border border-white/10 rounded-lg p-1">
                        <button className="px-3 py-1.5 text-xs font-medium bg-white/10 text-white rounded-md shadow-sm">Today</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Week</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Month</button>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                        <RefreshCcw size={14} /> Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Today's Sales"
                    value="₹45,780"
                    subtext="23 orders today"
                    trend="up"
                    trendValue="12%"
                    icon={Calendar}
                />
                <StatCard
                    title="This Week"
                    value="₹2,34,560"
                    subtext="156 orders this week"
                    trend="up"
                    trendValue="8%"
                    icon={Calendar}
                />
                <StatCard
                    title="This Month"
                    value="₹8,95,430"
                    subtext="542 orders this month"
                    trend="up"
                    trendValue="15%"
                    icon={Calendar}
                />
                <StatCard
                    title="Lifetime Sales"
                    value="₹45.6L"
                    subtext="3,247 total orders"
                    icon={Calendar}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Top Products</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={productPerformanceData} margin={{ top: 0, right: 0, bottom: 0, left: 40 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#999" fontSize={12} tickLine={false} axisLine={false} width={60} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {productPerformanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                    <Button size="sm" variant="ghost">View All</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3 rounded-l-lg">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 rounded-r-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">#ORD-2024-{1000 + i}</td>
                                    <td className="px-6 py-4">User {i}</td>
                                    <td className="px-6 py-4">Netflix Premium</td>
                                    <td className="px-6 py-4">₹499</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">Completed</span>
                                    </td>
                                    <td className="px-6 py-4">Feb 03, 2026</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
