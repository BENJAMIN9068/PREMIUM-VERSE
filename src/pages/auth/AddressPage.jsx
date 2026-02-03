import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Building, Globe, CheckCircle } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
].sort();

const AddressPage = () => {
    const navigate = useNavigate();
    const { updateAddress } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';

        if (!formData.pincode.trim()) newErrors.pincode = 'PIN Code is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'PIN Code must be 6 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            updateAddress(formData);
            setShowSuccess(true);

            // Delay redirect to show success animation
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error(error);
        } finally {
            if (!showSuccess) setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <AuthLayout title="Registration Complete" subtitle="Get ready to explore...">
                <div className="flex flex-col items-center justify-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center text-success animate-bounce">
                        <CheckCircle size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center">You're all set!</h3>
                    <p className="text-gray-400 text-center">Redirecting you to the best deals...</p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Complete Your Profile" subtitle="Step 2 of 2 - Delivery Details">
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Street Address</label>
                    <textarea
                        name="street"
                        rows={3}
                        placeholder="House/Flat number, Street name"
                        value={formData.street}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none p-3 glass ${errors.street ? 'border-error focus:ring-error/50' : ''}`}
                    />
                    {errors.street && <p className="text-xs text-error">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        name="city"
                        label="City"
                        placeholder="Enter City"
                        icon={Building}
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                    />

                    <Input
                        name="pincode"
                        label="PIN Code"
                        type="number"
                        placeholder="123456"
                        icon={MapPin}
                        value={formData.pincode}
                        onChange={handleChange}
                        error={errors.pincode}
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">State</label>
                    <div className="relative">
                        <Navigation className="absolute left-3 top-3 text-gray-400 pointer-events-none" size={18} />
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pl-10 appearance-none glass ${errors.state ? 'border-error focus:ring-error/50' : ''}`}
                        >
                            <option value="" disabled>Select State</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state} className="bg-gray-900">{state}</option>
                            ))}
                        </select>
                    </div>
                    {errors.state && <p className="text-xs text-error">{errors.state}</p>}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Country</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3 text-gray-400 pointer-events-none" size={18} />
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            disabled
                            className="w-full bg-white/5 border border-white/10 rounded-lg text-white/50 placeholder-gray-500 focus:outline-none transition-all p-2.5 pl-10 appearance-none glass cursor-not-allowed"
                        >
                            <option value="India" className="bg-gray-900">India</option>
                        </select>
                    </div>
                </div>

                <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full mt-6"
                >
                    Complete Registration
                </Button>
            </form>
        </AuthLayout>
    );
};

export default AddressPage;
