import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, AlertCircle, CheckCircle, Clock, Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import ProductModal from '../../components/admin/ProductModal';

// Mock Data
const INITIAL_PRODUCTS = Array.from({ length: 35 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Netflix Premium ${i + 1}` : `Windows 11 Pro ${i + 1}`,
    category: i % 2 === 0 ? 'Streaming Services' : 'Software Licenses',
    sku: `SKU-${1000 + i}`,
    stockStatus: i % 5 === 0 ? 'out_of_stock' : i % 3 === 0 ? 'low_stock' : 'in_stock',
    quantity: i % 5 === 0 ? 0 : Math.floor(Math.random() * 50),
    price: i % 2 === 0 ? 499 : 599,
    originalPrice: i % 2 === 0 ? 999 : 1499,
    features: ['Instant Delivery', 'Warranty'],
}));

const StockManagement = () => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // Row ID currently being inline edited

    // Computed Products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = statusFilter === 'all' || product.stockStatus === statusFilter;
            return matchesSearch && matchesFilter;
        });
    }, [products, searchQuery, statusFilter]);

    // Actions
    const handleSaveProduct = (productData) => {
        if (selectedProduct) {
            // Update existing
            setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...productData } : p));
        } else {
            // Create new
            setProducts(prev => [{ ...productData, id: Date.now() }, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(prev => prev.filter(p => p.id !== id));
            setIsModalOpen(false);
        }
    };

    const updateProductInline = (id, field, value) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'in_stock': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"><CheckCircle size={12} /> In Stock</span>;
            case 'out_of_stock': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-error/10 text-error border border-error/20"><AlertCircle size={12} /> Out of Stock</span>;
            case 'low_stock': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20"><AlertCircle size={12} /> Low Stock</span>;
            default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"><Clock size={12} /> Pre-order</span>;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                <div>
                    <h1 className="text-2xl font-bold text-white font-display">Stock Management</h1>
                    <p className="text-gray-400 text-sm">{filteredProducts.length} products found</p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 bg-black/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">All Status</option>
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>

                    <Button onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }} className="gap-2">
                        <Plus size={18} /> Add Product
                    </Button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-xs uppercase text-gray-400 border-b border-white/10">
                                <th className="px-6 py-4 font-medium">Product Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Price (₹)</th>
                                <th className="px-6 py-4 font-medium text-center">Stock</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-white mb-0.5">{product.name}</p>
                                            <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(product.stockStatus)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {editingId === product.id ? (
                                            <input
                                                type="number"
                                                defaultValue={product.price}
                                                onBlur={(e) => { updateProductInline(product.id, 'price', e.target.value); setEditingId(null); }}
                                                autoFocus
                                                className="w-20 bg-black border border-primary rounded px-2 py-1 text-right text-sm text-white"
                                            />
                                        ) : (
                                            <span onClick={() => setEditingId(product.id)} className="text-white font-medium cursor-pointer hover:text-primary transition-colors" title="Click to edit">
                                                ₹{product.price}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => updateProductInline(product.id, 'quantity', parseInt(e.target.value))}
                                            className="w-16 bg-black/20 border border-white/10 rounded px-2 py-1 text-center text-sm text-white focus:border-primary focus:outline-none"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
                onDelete={handleDeleteProduct}
            />
        </div>
    );
};

export default StockManagement;
