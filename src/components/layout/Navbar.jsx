import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, Package, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/home" className="flex items-center space-x-2 group">
                        <img src="/logo.png" alt="Premium Verse Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-lg" />
                        <span className="text-xl font-bold font-display text-white tracking-tight">PREMIUM<span className="text-primary">VERSE</span></span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/home" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
                        <Link to="/categories" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Categories</Link>
                        <Link to="/deals" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Deals</Link>

                        <div className="h-6 w-px bg-white/10 mx-2"></div>

                        <button className="text-gray-300 hover:text-white transition-colors relative">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-white">0</span>
                        </button>

                        {/* Profile Dropdown or Login Buttons */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                                        <User size={18} />
                                    </div>
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                        <div className="p-4 border-b border-white/5 bg-white/5">
                                            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors font-medium">
                                                <Package size={16} />
                                                <span>My Dashboard</span>
                                            </Link>
                                            <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <User size={16} />
                                                <span>My Profile</span>
                                            </Link>
                                            <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <Package size={16} />
                                                <span>My Subscriptions</span>
                                            </Link>
                                            <Link to="/address" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <MapPin size={16} />
                                                <span>Addresses</span>
                                            </Link>
                                        </div>
                                        <div className="p-2 border-t border-white/5">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center space-x-3 px-3 py-2 rounded-lg text-sm text-error hover:bg-error/10 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button className="text-gray-300 hover:text-white transition-colors relative">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-white">0</span>
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="px-4 py-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="space-y-2">
                            <Link to="/home" className="block px-3 py-2 text-base font-medium text-white bg-white/5 rounded-lg">Home</Link>
                            <Link to="/categories" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">Categories</Link>
                            <Link to="/deals" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">Today's Deals</Link>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 px-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                                            {user?.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center space-x-2 px-3 py-2 text-primary bg-primary/10 rounded-lg transition-colors mb-2">
                                        <Package size={18} />
                                        <span className="font-medium">My Dashboard</span>
                                    </Link>
                                    <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-3 px-3">
                                    <Link to="/login" className="block w-full">
                                        <Button variant="ghost" className="w-full justify-start">Login</Button>
                                    </Link>
                                    <Link to="/signup" className="block w-full">
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
