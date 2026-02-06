import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, CreditCard, Settings, LogOut, Menu, X, ChevronRight, Box } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
    const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Box, label: 'Products', path: '/admin/products' },
        { icon: Package, label: 'Stock Management', path: '/admin/stock' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                        <h2 className="text-white font-bold font-display tracking-tight">PREMIUM<span className="text-primary">ADMIN</span></h2>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Control Panel</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-primary/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white transition-colors'} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && <ChevronRight size={16} className="ml-auto text-primary" />}
                        </NavLink>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-3 mb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
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
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-error hover:bg-error/10 p-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-50">
                <SidebarContent />
            </aside>

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
            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
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
                        <div className="hidden lg:flex justify-end mb-6 text-xs text-gray-500">
                            <p>{currentDate}</p>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
