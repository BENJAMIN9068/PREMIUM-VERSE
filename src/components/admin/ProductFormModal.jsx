// Product Form Modal - Add/Edit product with live profit calculator
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash, AlertTriangle, Save, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { ProfitPreviewBox } from './ProfitIndicator';
import { ProductStore, PRODUCT_CATEGORIES, generateSKU } from '../../data/productStore';

const VALIDITY_OPTIONS = [
    '1 Month',
    '3 Months',
    '6 Months',
    '1 Year',
    'Lifetime',
    '1 Screen',
    '4 Screens',
    'Per Device'
];

const STOCK_STATUS_OPTIONS = [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'limited', label: 'Limited Stock' }
];

const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        category: 'ott',
        validity: '1 Month',
        description: '',
        image_url: '',
        provider_name: '',
        provider_cost: '',
        selling_price: '',
        original_price: '',
        stock_status: 'in_stock',
        is_featured: false,
        is_active: true,
        sku: ''
    });
    const [errors, setErrors] = useState({});
    const [customCategory, setCustomCategory] = useState('');
    const [showCustomCategory, setShowCustomCategory] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name || '',
                category: product.category || 'ott',
                validity: product.validity || '1 Month',
                description: product.description || '',
                image_url: product.image_url || '',
                provider_name: product.provider_name || '',
                provider_cost: product.provider_cost?.toString() || '',
                selling_price: product.selling_price?.toString() || '',
                original_price: product.original_price?.toString() || '',
                stock_status: product.stock_status || 'in_stock',
                is_featured: product.is_featured || false,
                is_active: product.is_active ?? true,
                sku: product.sku || ''
            });
        } else {
            // Reset for new product
            setFormData({
                product_name: '',
                category: 'ott',
                validity: '1 Month',
                description: '',
                image_url: '',
                provider_name: '',
                provider_cost: '',
                selling_price: '',
                original_price: '',
                stock_status: 'in_stock',
                is_featured: false,
                is_active: true,
                sku: generateSKU()
            });
        }
        setErrors({});
    }, [product, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.product_name.trim()) {
            newErrors.product_name = 'Product name is required';
        }
        if (!formData.provider_name.trim()) {
            newErrors.provider_name = 'Provider name is required';
        }
        if (!formData.provider_cost || parseFloat(formData.provider_cost) < 0) {
            newErrors.provider_cost = 'Valid provider cost is required';
        }
        if (!formData.selling_price || parseFloat(formData.selling_price) < 0) {
            newErrors.selling_price = 'Valid selling price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const productData = {
            ...formData,
            provider_cost: parseFloat(formData.provider_cost),
            selling_price: parseFloat(formData.selling_price),
            original_price: parseFloat(formData.original_price) || parseFloat(formData.selling_price) * 2,
            category: showCustomCategory && customCategory ? customCategory : formData.category
        };

        if (product) {
            ProductStore.updateProduct(product.id, productData);
        } else {
            ProductStore.addProduct(productData);
        }

        onSave?.();
        onClose();
    };

    const handleSaveAndAdd = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const productData = {
            ...formData,
            provider_cost: parseFloat(formData.provider_cost),
            selling_price: parseFloat(formData.selling_price),
            original_price: parseFloat(formData.original_price) || parseFloat(formData.selling_price) * 2,
            category: showCustomCategory && customCategory ? customCategory : formData.category
        };

        ProductStore.addProduct(productData);

        // Reset form for next product
        setFormData({
            product_name: '',
            category: formData.category, // Keep category
            validity: formData.validity, // Keep validity
            description: '',
            image_url: '',
            provider_name: formData.provider_name, // Keep provider
            provider_cost: '',
            selling_price: '',
            original_price: '',
            stock_status: 'in_stock',
            is_featured: false,
            is_active: true,
            sku: generateSKU()
        });
        setErrors({});
        onSave?.();
    };

    const isLoss = parseFloat(formData.selling_price) < parseFloat(formData.provider_cost);

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
                    className="bg-[#1a1a1a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative z-70"
                >
                    {/* Header */}
                    <header className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex justify-between items-center z-10">
                        <h2 className="text-2xl font-bold text-white font-display">
                            {product ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                    </header>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Basic Info Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label htmlFor="product_name" className="text-sm font-medium text-gray-300">
                                        Product Name *
                                    </label>
                                    <input
                                        id="product_name"
                                        name="product_name"
                                        type="text"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        placeholder="e.g., Netflix Premium"
                                        className={`w-full bg-white/5 border ${errors.product_name ? 'border-error' : 'border-white/10'} rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                    />
                                    {errors.product_name && (
                                        <p className="text-error text-xs flex items-center gap-1">
                                            <AlertTriangle size={12} /> {errors.product_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="category" className="text-sm font-medium text-gray-300">
                                        Category *
                                    </label>
                                    {!showCustomCategory ? (
                                        <div className="flex gap-2">
                                            <select
                                                id="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                {PRODUCT_CATEGORIES.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => setShowCustomCategory(true)}
                                                className="px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                + New
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={customCategory}
                                                onChange={(e) => setCustomCategory(e.target.value)}
                                                placeholder="Enter new category"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCustomCategory(false)}
                                                className="px-3 py-2 text-xs text-gray-400 hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="validity" className="text-sm font-medium text-gray-300">
                                        Validity *
                                    </label>
                                    <select
                                        id="validity"
                                        name="validity"
                                        value={formData.validity}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {VALIDITY_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="sku" className="text-sm font-medium text-gray-300">
                                        SKU
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="sku"
                                            name="sku"
                                            type="text"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, sku: generateSKU() }))}
                                            className="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            title="Generate new SKU"
                                        >
                                            <RotateCcw size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-1.5">
                                    <label htmlFor="description" className="text-sm font-medium text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Product description..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-1.5">
                                    <label htmlFor="image_url" className="text-sm font-medium text-gray-300">
                                        Image URL
                                    </label>
                                    <input
                                        id="image_url"
                                        name="image_url"
                                        type="url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Provider & Pricing Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-error border-b border-error/20 pb-2 flex items-center gap-2">
                                🔒 Provider & Pricing (Admin Only)
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="provider_name" className="text-sm font-medium text-red-300">
                                            Provider Name *
                                        </label>
                                        <input
                                            id="provider_name"
                                            name="provider_name"
                                            type="text"
                                            value={formData.provider_name}
                                            onChange={handleChange}
                                            placeholder="e.g., List 1, Vendor ABC"
                                            className={`w-full bg-red-500/5 border ${errors.provider_name ? 'border-error' : 'border-red-500/20'} rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                                        />
                                        {errors.provider_name && (
                                            <p className="text-error text-xs flex items-center gap-1">
                                                <AlertTriangle size={12} /> {errors.provider_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="provider_cost" className="text-sm font-medium text-red-300">
                                            Provider Cost (₹) *
                                        </label>
                                        <input
                                            id="provider_cost"
                                            name="provider_cost"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.provider_cost}
                                            onChange={handleChange}
                                            placeholder="What YOU pay to provider"
                                            className={`w-full bg-red-500/5 border ${errors.provider_cost ? 'border-error' : 'border-red-500/20'} rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                                        />
                                        {errors.provider_cost && (
                                            <p className="text-error text-xs flex items-center gap-1">
                                                <AlertTriangle size={12} /> {errors.provider_cost}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="selling_price" className="text-sm font-medium text-green-300">
                                            Selling Price (₹) *
                                        </label>
                                        <input
                                            id="selling_price"
                                            name="selling_price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.selling_price}
                                            onChange={handleChange}
                                            placeholder="What CUSTOMER pays you"
                                            className={`w-full bg-success/5 border ${errors.selling_price ? 'border-error' : 'border-success/20'} rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-success/50`}
                                        />
                                        {errors.selling_price && (
                                            <p className="text-error text-xs flex items-center gap-1">
                                                <AlertTriangle size={12} /> {errors.selling_price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="original_price" className="text-sm font-medium text-gray-300">
                                            Original/MRP Price (₹) - for discount display
                                        </label>
                                        <input
                                            id="original_price"
                                            name="original_price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.original_price}
                                            onChange={handleChange}
                                            placeholder="Shown as strikethrough on website"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                </div>

                                {/* Live Profit Calculator */}
                                <div className="lg:pt-6">
                                    <ProfitPreviewBox
                                        providerCost={formData.provider_cost}
                                        sellingPrice={formData.selling_price}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Stock & Settings Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">
                                Stock & Settings
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1.5">
                                    <label htmlFor="stock_status" className="text-sm font-medium text-gray-300">
                                        Stock Status
                                    </label>
                                    <select
                                        id="stock_status"
                                        name="stock_status"
                                        value={formData.stock_status}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {STOCK_STATUS_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-4 pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="is_featured"
                                            checked={formData.is_featured}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
                                        />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            Featured Product
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center gap-4 pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-success focus:ring-success/50"
                                        />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            Active (visible on website)
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Loss Warning */}
                        {isLoss && (
                            <div className="bg-error/10 border border-error/30 rounded-xl p-4 flex items-center gap-3">
                                <AlertTriangle className="text-error flex-shrink-0" size={24} />
                                <div>
                                    <p className="text-error font-bold">⚠️ WARNING: You will make a LOSS!</p>
                                    <p className="text-error/80 text-sm">
                                        Selling price (₹{formData.selling_price || 0}) is less than provider cost (₹{formData.provider_cost || 0})
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <footer className="flex flex-wrap justify-end gap-3 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            {!product && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleSaveAndAdd}
                                    className="gap-2"
                                >
                                    <Plus size={16} /> Save & Add Another
                                </Button>
                            )}
                            <Button type="submit" className="gap-2 min-w-[140px]">
                                <Save size={16} />
                                {product ? 'Save Changes' : 'Create Product'}
                            </Button>
                        </footer>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductFormModal;
