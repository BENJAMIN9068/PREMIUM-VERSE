import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Building, Globe, CheckCircle, Phone } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

// Country codes list
const COUNTRY_CODES = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
];

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
].sort();

// Dropdown styles for dark theme
const selectStyles = "w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pl-10 appearance-none cursor-pointer";
const optionStyles = "bg-[#1a1a1a] text-white hover:bg-primary/20";

const AddressPage = () => {
    const navigate = useNavigate();
    const { user, updateAddress } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if user came from Google signup (no phone number)
    const needsPhone = !user?.phone || user?.authProvider === 'google';

    const [formData, setFormData] = useState({
        countryCode: '+91',
        phone: user?.phone || '',
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

        // Phone validation (required for Google users or if empty)
        if (needsPhone && !formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Enter valid 10-digit phone number';
        }

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
            await new Promise(resolve => setTimeout(resolve, 1000));

            const fullPhone = formData.countryCode + ' ' + formData.phone;
            updateAddress({
                ...formData,
                phone: fullPhone
            });
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
        <AuthLayout title="Complete Your Profile" subtitle="Step 2 of 2 - Contact & Delivery Details">
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Phone Number Section */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">
                        Phone Number {needsPhone && <span className="text-error">*</span>}
                    </label>
                    <div className="flex gap-2">
                        {/* Country Code Dropdown */}
                        <div className="relative w-32 flex-shrink-0">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pr-2 appearance-none cursor-pointer"
                                style={{
                                    colorScheme: 'dark',
                                    WebkitAppearance: 'none'
                                }}
                            >
                                {COUNTRY_CODES.map((c, i) => (
                                    <option
                                        key={i}
                                        value={c.code}
                                        style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                                    >
                                        {c.flag} {c.code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex-1 relative">
                            <Phone className="absolute left-3 top-3 text-gray-400 pointer-events-none" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pl-10 ${errors.phone ? 'border-error focus:ring-error/50' : ''}`}
                            />
                        </div>
                    </div>
                    {errors.phone && <p className="text-xs text-error">{errors.phone}</p>}
                </div>

                <div className="border-t border-white/10 my-4 pt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Delivery Address</h4>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Street Address</label>
                    <textarea
                        name="street"
                        rows={3}
                        placeholder="House/Flat number, Street name"
                        value={formData.street}
                        onChange={handleChange}
                        className={`w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none p-3 ${errors.street ? 'border-error focus:ring-error/50' : ''}`}
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
                            className={`w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pl-10 appearance-none cursor-pointer ${errors.state ? 'border-error focus:ring-error/50' : ''}`}
                            style={{ colorScheme: 'dark' }}
                        >
                            <option value="" disabled style={{ backgroundColor: '#1a1a1a', color: '#9ca3af' }}>Select State</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state} style={{ backgroundColor: '#1a1a1a', color: 'white' }}>{state}</option>
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
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all p-2.5 pl-10 appearance-none cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        >
                            <option value="India" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇳 India</option>
                            <option value="USA" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇺🇸 USA</option>
                            <option value="Canada" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇨🇦 Canada</option>
                            <option value="UK" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇬🇧 United Kingdom</option>
                            <option value="Australia" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇦🇺 Australia</option>
                            <option value="Germany" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇩🇪 Germany</option>
                            <option value="France" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇫🇷 France</option>
                            <option value="Japan" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇯🇵 Japan</option>
                            <option value="China" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇨🇳 China</option>
                            <option value="UAE" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇦🇪 UAE</option>
                            <option value="Saudi Arabia" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇸🇦 Saudi Arabia</option>
                            <option value="Singapore" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇸🇬 Singapore</option>
                            <option value="Malaysia" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇲🇾 Malaysia</option>
                            <option value="Indonesia" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇩 Indonesia</option>
                            <option value="Thailand" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇹🇭 Thailand</option>
                            <option value="Vietnam" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇻🇳 Vietnam</option>
                            <option value="South Korea" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇰🇷 South Korea</option>
                            <option value="Bangladesh" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇧🇩 Bangladesh</option>
                            <option value="Pakistan" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇵🇰 Pakistan</option>
                            <option value="Sri Lanka" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇱🇰 Sri Lanka</option>
                            <option value="Nepal" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇵 Nepal</option>
                            <option value="South Africa" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇿🇦 South Africa</option>
                            <option value="Nigeria" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇬 Nigeria</option>
                            <option value="Kenya" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇰🇪 Kenya</option>
                            <option value="Egypt" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇪🇬 Egypt</option>
                            <option value="Brazil" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇧🇷 Brazil</option>
                            <option value="Mexico" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇲🇽 Mexico</option>
                            <option value="Russia" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇷🇺 Russia</option>
                            <option value="Italy" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇹 Italy</option>
                            <option value="Spain" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇪🇸 Spain</option>
                            <option value="Netherlands" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇱 Netherlands</option>
                            <option value="Sweden" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇸🇪 Sweden</option>
                            <option value="Norway" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇴 Norway</option>
                            <option value="Denmark" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇩🇰 Denmark</option>
                            <option value="Switzerland" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇨🇭 Switzerland</option>
                            <option value="Austria" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇦🇹 Austria</option>
                            <option value="Poland" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇵🇱 Poland</option>
                            <option value="Turkey" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇹🇷 Turkey</option>
                            <option value="Israel" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇱 Israel</option>
                            <option value="New Zealand" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇳🇿 New Zealand</option>
                            <option value="Philippines" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇵🇭 Philippines</option>
                            <option value="Ireland" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇮🇪 Ireland</option>
                            <option value="Portugal" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇵🇹 Portugal</option>
                            <option value="Greece" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇬🇷 Greece</option>
                            <option value="Belgium" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇧🇪 Belgium</option>
                            <option value="Hungary" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇭🇺 Hungary</option>
                            <option value="Czech Republic" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇨🇿 Czech Republic</option>
                            <option value="Romania" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇷🇴 Romania</option>
                            <option value="Ukraine" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>🇺🇦 Ukraine</option>
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
