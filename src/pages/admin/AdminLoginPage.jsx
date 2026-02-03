import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { login, isLocked } = useAdminAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            // Intentional delay to mimic server verification
            await new Promise(resolve => setTimeout(resolve, 1500));
            await login(formData.email, formData.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-space-gradient opacity-50 z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-pulse-slow"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                        <Lock className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-display">Admin Access</h1>
                    <p className="text-gray-500 text-sm mt-1">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-6 flex items-start gap-3">
                        <AlertCircle className="text-error shrink-0" size={18} />
                        <p className="text-error text-sm">{error}</p>
                    </div>
                )}

                {isLocked ? (
                    <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
                        <AlertCircle className="text-error mx-auto mb-3" size={32} />
                        <h3 className="text-error font-bold mb-2">Access Locked</h3>
                        <p className="text-gray-400 text-sm">Too many failed attempts. Please try again after 15 minutes.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter admin email"
                            icon={Mail}
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            className="bg-black/50"
                        />

                        <div className="relative">
                            <Input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                icon={Lock}
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-black/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[10px] text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                        >
                            Access Dashboard
                        </Button>
                    </form>
                )}

                <div className="mt-6 text-center border-t border-white/5 pt-4">
                    <p className="text-xs text-gray-600">
                        Secure Connection • IP Logged
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
