import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await login(formData.email, formData.password);
            // Navigation handled by AuthContext or separate logic, 
            // but usually we redirect to home if success.
            // checking login implementation might be good, but safe to assume navigate here for now or let context handle it.
            // If context doesn't auto-redirect, we do it here:
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Mock Google Login
            await new Promise(resolve => setTimeout(resolve, 1500));
            await login('google_user@gmail.com', 'google_pass', 'google');
            navigate('/dashboard');
        } catch (err) {
            setError('Google Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Login to access premium deals">
            <div className="space-y-6">
                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium h-12 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26+-.19-.58z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Login with Google
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-400">OR</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[10px] text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && <p className="text-sm text-error text-center">{error}</p>}

                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">Forgot Password?</a>
                    </div>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:text-primary/80 font-medium hover:underline transition-all">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
