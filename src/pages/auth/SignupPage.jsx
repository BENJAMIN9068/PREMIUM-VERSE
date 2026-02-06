import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { signup, loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

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
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
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
            await new Promise(resolve => setTimeout(resolve, 500));

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
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Signup Success
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate('/address');
        } catch (err) {
            setError('Google signup failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Signup Error
    const handleGoogleError = () => {
        setError('Google signup failed. Please try again.');
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join thousands getting premium subscriptions at 90% off">
            <div className="space-y-6">
                {/* Google Signup Button */}
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="filled_black"
                        size="large"
                        width="100%"
                        text="signup_with"
                        shape="rectangular"
                        logo_alignment="left"
                    />
                </div>

                {error && <p className="text-sm text-error text-center">{error}</p>}

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
                        <select
                            className="bg-[#1a1a1a] border border-white/10 rounded-lg text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        >
                            <option value="+91" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇳 +91</option>
                            <option value="+1" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇺🇸 +1</option>
                            <option value="+44" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇬🇧 +44</option>
                            <option value="+61" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇦🇺 +61</option>
                            <option value="+971" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇦🇪 +971</option>
                            <option value="+966" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇸🇦 +966</option>
                            <option value="+65" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇸🇬 +65</option>
                            <option value="+49" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇩🇪 +49</option>
                            <option value="+33" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇫🇷 +33</option>
                            <option value="+81" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇯🇵 +81</option>
                            <option value="+86" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇨🇳 +86</option>
                            <option value="+82" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇰🇷 +82</option>
                            <option value="+880" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇧🇩 +880</option>
                            <option value="+92" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇵🇰 +92</option>
                            <option value="+977" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇵 +977</option>
                            <option value="+94" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇱🇰 +94</option>
                            <option value="+55" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇧🇷 +55</option>
                            <option value="+52" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇲🇽 +52</option>
                            <option value="+7" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇷🇺 +7</option>
                            <option value="+27" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇿🇦 +27</option>
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
