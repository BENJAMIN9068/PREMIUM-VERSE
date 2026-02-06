import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();
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
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Login Success
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate('/dashboard');
        } catch (err) {
            setError('Google login failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Login Error
    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Login to access premium deals">
            <div className="space-y-6">
                {/* Google Login Button */}
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="filled_black"
                        size="large"
                        width="100%"
                        text="signin_with"
                        shape="rectangular"
                        logo_alignment="left"
                    />
                </div>

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
