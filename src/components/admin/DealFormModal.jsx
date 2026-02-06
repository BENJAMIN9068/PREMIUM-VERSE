// Deal Form Modal - Create/Edit deals with product selection and conditions
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Gift, ShoppingCart, Zap, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { ProductStore } from '../../data/productStore';
import { DealsStore, calculateDealSavings, getDealConditionText } from '../../data/dealsStore';

const DealFormModal = ({ isOpen, onClose, deal, onSave }) => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        deal_price: '',
        min_purchase_amount: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_active: true,
        is_featured: false,
        description: ''
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProducts(ProductStore.getAllProducts());
    }, []);

    useEffect(() => {
        if (deal) {
            setFormData({
                product_id: deal.product_id?.toString() || '',
                deal_price: deal.deal_price?.toString() || '',
                min_purchase_amount: deal.min_purchase_amount?.toString() || '0',
                start_date: deal.start_date || new Date().toISOString().split('T')[0],
                end_date: deal.end_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                is_active: deal.is_active ?? true,
                is_featured: deal.is_featured ?? false,
                description: deal.description || ''
            });
            const prod = products.find(p => p.id === deal.product_id);
            setSelectedProduct(prod || null);
        } else {
            setFormData({
                product_id: '',
                deal_price: '',
                min_purchase_amount: '0',
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                is_active: true,
                is_featured: false,
                description: ''
            });
            setSelectedProduct(null);
        }
        setErrors({});
    }, [deal, isOpen, products]);

    const handleProductChange = (e) => {
        const productId = e.target.value;
        setFormData(prev => ({ ...prev, product_id: productId }));
        const prod = products.find(p => p.id.toString() === productId);
        setSelectedProduct(prod || null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.product_id) {
            newErrors.product_id = 'Please select a product';
        }
        if (formData.deal_price === '' || parseFloat(formData.deal_price) < 0) {
            newErrors.deal_price = 'Deal price is required (can be 0)';
        }
        if (!formData.start_date) {
            newErrors.start_date = 'Start date is required';
        }
        if (!formData.end_date) {
            newErrors.end_date = 'End date is required';
        }
        if (formData.start_date > formData.end_date) {
            newErrors.end_date = 'End date must be after start date';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const dealData = {
            product_id: parseInt(formData.product_id),
            product_name: selectedProduct?.product_name || '',
            product_image: selectedProduct?.image_url || '',
            category: selectedProduct?.category || '',
            original_price: selectedProduct?.selling_price || 0,
            deal_price: parseFloat(formData.deal_price),
            min_purchase_amount: parseFloat(formData.min_purchase_amount) || 0,
            description: formData.description || `Get ${selectedProduct?.product_name} at special price!`,
            start_date: formData.start_date,
            end_date: formData.end_date,
            is_active: formData.is_active,
            is_featured: formData.is_featured
        };

        if (deal) {
            DealsStore.updateDeal(deal.id, dealData);
        } else {
            DealsStore.addDeal(dealData);
        }

        onSave?.();
        onClose();
    };

    // Calculate preview
    const previewSavings = selectedProduct ? {
        savings: selectedProduct.selling_price - (parseFloat(formData.deal_price) || 0),
        percentage: selectedProduct.selling_price > 0
            ? Math.round(((selectedProduct.selling_price - (parseFloat(formData.deal_price) || 0)) / selectedProduct.selling_price) * 100)
            : 0
    } : { savings: 0, percentage: 0 };

    const isFree = parseFloat(formData.deal_price) === 0;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#1a1a1a] border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative z-70"
                >
                    {/* Header */}
                    <header className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex justify-between items-center z-10">
                        <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                            <Zap className="text-warning" size={24} />
                            {deal ? 'Edit Deal' : 'Create New Deal'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <X size={24} />
                        </button>
                    </header>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Product Selection */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">
                                Select Product
                            </h3>
                            <div className="space-y-2">
                                <label htmlFor="product_id" className="text-sm font-medium text-gray-300">
                                    Product *
                                </label>
                                <select
                                    id="product_id"
                                    name="product_id"
                                    value={formData.product_id}
                                    onChange={handleProductChange}
                                    className={`w-full bg-white/5 border ${errors.product_id ? 'border-error' : 'border-white/10'} rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                >
                                    <option value="">-- Select a Product --</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.product_name} - ₹{p.selling_price}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <p className="text-error text-xs">{errors.product_id}</p>
                                )}
                            </div>
                        </section>

                        {/* Pricing Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-warning border-b border-warning/20 pb-2 flex items-center gap-2">
                                💰 Deal Pricing
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="deal_price" className="text-sm font-medium text-gray-300">
                                        Deal Price (₹) * <span className="text-gray-500">(can be ₹0 for FREE)</span>
                                    </label>
                                    <input
                                        id="deal_price"
                                        name="deal_price"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={formData.deal_price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className={`w-full bg-warning/5 border ${errors.deal_price ? 'border-error' : 'border-warning/20'} rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-warning/50`}
                                    />
                                    {errors.deal_price && (
                                        <p className="text-error text-xs">{errors.deal_price}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="min_purchase_amount" className="text-sm font-medium text-gray-300">
                                        Minimum Purchase Required (₹) <span className="text-gray-500">(0 = no condition)</span>
                                    </label>
                                    <input
                                        id="min_purchase_amount"
                                        name="min_purchase_amount"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={formData.min_purchase_amount}
                                        onChange={handleChange}
                                        placeholder="500"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Deal Preview */}
                        {selectedProduct && (
                            <section className="bg-gradient-to-br from-warning/10 to-primary/10 border border-warning/20 rounded-xl p-4">
                                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Gift size={18} className="text-warning" /> Deal Preview
                                </h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center">
                                        {selectedProduct.image_url ? (
                                            <img src={selectedProduct.image_url} alt="" className="h-10 w-auto filter invert" />
                                        ) : (
                                            <span className="text-2xl">📦</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-white">{selectedProduct.product_name}</h5>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-gray-400 line-through text-sm">₹{selectedProduct.selling_price}</span>
                                            <span className={`text-xl font-bold ${isFree ? 'text-success' : 'text-warning'}`}>
                                                {isFree ? 'FREE!' : `₹${formData.deal_price || 0}`}
                                            </span>
                                            <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                                                {previewSavings.percentage}% OFF
                                            </span>
                                        </div>
                                        {parseFloat(formData.min_purchase_amount) > 0 && (
                                            <p className="text-sm text-primary mt-1 flex items-center gap-1">
                                                <ShoppingCart size={14} />
                                                Shop ₹{formData.min_purchase_amount}+ to unlock
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Duration Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2 flex items-center gap-2">
                                <Calendar size={18} /> Deal Duration
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="start_date" className="text-sm font-medium text-gray-300">Start Date *</label>
                                    <input
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="end_date" className="text-sm font-medium text-gray-300">End Date *</label>
                                    <input
                                        id="end_date"
                                        name="end_date"
                                        type="date"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.end_date ? 'border-error' : 'border-white/10'} rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                    />
                                    {errors.end_date && (
                                        <p className="text-error text-xs">{errors.end_date}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Description */}
                        <section className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-300">
                                Deal Description (optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Get this amazing product at special price!"
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </section>

                        {/* Settings */}
                        <section className="flex flex-wrap gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-success focus:ring-success/50"
                                />
                                <span className="text-sm text-gray-300">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    checked={formData.is_featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-warning focus:ring-warning/50"
                                />
                                <span className="text-sm text-gray-300">Featured Deal</span>
                            </label>
                        </section>

                        {/* Actions */}
                        <footer className="flex justify-end gap-3 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" className="gap-2 min-w-[140px]">
                                <Save size={16} />
                                {deal ? 'Save Changes' : 'Create Deal'}
                            </Button>
                        </footer>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DealFormModal;
