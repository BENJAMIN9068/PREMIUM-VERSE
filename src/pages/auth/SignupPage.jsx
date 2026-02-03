import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Data is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // Mock API call simulation
            await new Promise(resolve => setTimeout(resolve, 1500));

            const userData = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                signupMethod: 'manual',
                isAddressComplete: false
            };

            await signup(userData);
            navigate('/address');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const userData = {
                id: Date.now().toString(),
                name: 'Google User',
                email: 'user@gmail.com',
                signupMethod: 'google',
                isAddressComplete: false
            };
            await signup(userData);
            navigate('/address');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join thousands getting premium subscriptions at 90% off">
            <div className="space-y-6">
                {/* Google Signup Button */}
                <button
                    onClick={handleGoogleSignup}
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
                    Sign up with Google
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
                        name="name"
                        placeholder="Enter your full name"
                        icon={User}
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <div className="flex gap-2">
                        <select className="bg-white/5 border border-white/10 rounded-lg text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none">
                            <option value="+91">+91</option>
                        </select>
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="98765 43210"
                            icon={Phone}
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            className="flex-1"
                        />
                    </div>

                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create Password (min 8 chars)"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[10px] text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />

                    <div className="flex items-start gap-3 pt-2">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="agreeToTerms"
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-gray-600 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0 focus:ring-2"
                            />
                        </div>
                        <label htmlFor="terms" className="text-sm text-gray-400 leading-tight">
                            I agree to the <a href="#" className="text-primary hover:text-primary/80 underline">Privacy Policy</a> & <a href="#" className="text-primary hover:text-primary/80 underline">Terms of Service</a>
                        </label>
                    </div>
                    {errors.agreeToTerms && <p className="text-xs text-error">{errors.agreeToTerms}</p>}

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full mt-4"
                    >
                        Create Account
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 font-medium hover:underline transition-all">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignupPage;
