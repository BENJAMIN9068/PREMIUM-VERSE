import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, CreditCard, Settings, LogOut, Menu, X, ChevronRight, Box, ChevronLeft, PanelLeftClose, PanelLeft, Zap } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse state
    const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Box, label: 'Products', path: '/admin/products' },
        { icon: Zap, label: "Today's Deals", path: '/admin/deals' },
        { icon: Package, label: 'Stock Management', path: '/admin/stock' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const SidebarContent = ({ collapsed = false }) => (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10">
            {/* Header */}
            <div className={`p-4 border-b border-white/10 ${collapsed ? 'px-2' : 'p-6'}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">A</span>
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="text-white font-bold font-display tracking-tight">PREMIUM<span className="text-primary">ADMIN</span></h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Control Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className={`flex-1 overflow-y-auto py-6 space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            title={collapsed ? item.label : undefined}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-primary/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white transition-colors'} />
                            {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                            {!collapsed && isActive && <ChevronRight size={16} className="ml-auto text-primary" />}
                        </NavLink>
                    );
                })}
            </div>

            {/* Footer */}
            <div className={`border-t border-white/10 ${collapsed ? 'p-2' : 'p-4'}`}>
                {!collapsed && (
                    <div className="bg-white/5 rounded-xl p-3 mb-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm text-white font-medium truncate">{admin?.email}</p>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                                <p className="text-xs text-gray-400">Super Admin</p>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    title={collapsed ? 'Logout' : undefined}
                    className={`w-full flex items-center gap-2 text-error hover:bg-error/10 p-2 rounded-lg transition-colors text-sm font-medium ${collapsed ? 'justify-center' : 'justify-center'}`}
                >
                    <LogOut size={16} />
                    {!collapsed && 'Logout'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 64 : 256 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hidden lg:block fixed inset-y-0 left-0 z-50"
            >
                <SidebarContent collapsed={sidebarCollapsed} />

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-200 shadow-lg"
                    title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
                        >
                            <SidebarContent />
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.main
                initial={false}
                animate={{ marginLeft: sidebarCollapsed ? 64 : 256 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex-1 min-h-screen flex flex-col lg:ml-64"
                style={{ marginLeft: undefined }} // Override inline style for mobile
            >
                {/* Mobile Header */}
                <div className="lg:hidden h-16 border-b border-white/10 flex items-center justify-between px-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="text-white">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold font-display">PREMIUM<span className="text-primary">ADMIN</span></span>
                    </div>
                </div>

                <div className="flex-1 p-4 md:p-8 bg-black">
                    <div className="max-w-7xl mx-auto w-full">
                        {/* Top Bar Info (Desktop) */}
                        <div className="hidden lg:flex justify-between items-center mb-6">
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                            >
                                {sidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                            </button>
                            <p className="text-xs text-gray-500">{currentDate}</p>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

export default AdminLayout;
