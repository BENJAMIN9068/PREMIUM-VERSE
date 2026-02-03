import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash, Check } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CATEGORIES = [
    'Streaming Services', 'AI Tools', 'Software Licenses',
    'Antivirus', 'VPN Services', 'Gaming', 'Music Streaming',
    'Cloud Storage', 'Productivity Tools', 'Gift Cards'
];

const ProductModal = ({ isOpen, onClose, product, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        sku: '',
        originalPrice: '',
        discountPercent: 0,
        currentPrice: '',
        stockStatus: 'in_stock',
        quantity: 0,
        features: ['Instant Delivery'],
        validity: '',
        description: ''
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            // Reset for new product
            setFormData({
                name: '',
                category: CATEGORIES[0],
                sku: `SKU-${Date.now().toString().slice(-6)}`,
                originalPrice: '',
                discountPercent: 0,
                currentPrice: '',
                stockStatus: 'in_stock',
                quantity: 0,
                features: ['Instant Delivery'],
                validity: '',
                description: ''
            });
        }
    }, [product, isOpen]);

    // Auto-calculate current price based on discount
    useEffect(() => {
        if (formData.originalPrice && formData.discountPercent) {
            const original = parseFloat(formData.originalPrice);
            const discount = parseFloat(formData.discountPercent);
            const current = original - (original * (discount / 100));
            setFormData(prev => ({ ...prev, currentPrice: Math.round(current) }));
        }
    }, [formData.originalPrice, formData.discountPercent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

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
                    <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex justify-between items-center z-10">
                        <h2 className="text-2xl font-bold text-white font-display">
                            {product ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Product Info */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">Product Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300 block mb-1.5">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Pricing & Stock */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">Pricing & Inventory</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input label="Original Price (₹)" name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} required />
                                <Input label="Discount (%)" name="discountPercent" type="number" value={formData.discountPercent} onChange={handleChange} />
                                <Input label="Current Price (₹)" name="currentPrice" type="number" value={formData.currentPrice} onChange={handleChange} readOnly className="opacity-70 bg-black/20" />

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Stock Status</label>
                                    <select
                                        name="stockStatus"
                                        value={formData.stockStatus}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="in_stock">In Stock</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                        <option value="pre_booking">Pre-booking</option>
                                        <option value="low_stock">Low Stock</option>
                                    </select>
                                </div>
                                <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
                                <Input label="SKU" name="sku" value={formData.sku} onChange={handleChange} />
                            </div>
                        </section>

                        {/* Features & Misc */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-primary border-b border-white/5 pb-2">Features & Validity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Validity Period" name="validity" placeholder="e.g. 1 Year, Lifetime" value={formData.validity} onChange={handleChange} />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Key Features</label>
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <button type="button" onClick={() => removeFeature(index)} className="text-error hover:text-error/80 p-2">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addFeature} className="text-sm text-primary flex items-center gap-1 hover:underline">
                                        <Plus size={14} /> Add Feature
                                    </button>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                            {product && (
                                <button type="button" onClick={() => onDelete(product.id)} className="mr-auto text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                    <Trash size={18} /> Delete Product
                                </button>
                            )}
                            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                            <Button type="submit" className="min-w-[120px]">
                                {product ? 'Save Changes' : 'Create Product'}
                            </Button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductModal;
