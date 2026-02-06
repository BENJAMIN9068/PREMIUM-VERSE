// Admin Products Page - Product management with table view
import { useState, useMemo, useEffect } from 'react';
import {
    Search, Filter, Plus, Edit2, Trash2, Download, Upload,
    CheckCircle, XCircle, AlertCircle, Star, Eye, EyeOff,
    ChevronLeft, ChevronRight, ArrowUpDown, MoreVertical
} from 'lucide-react';
import Button from '../../components/ui/Button';
import ProductFormModal from '../../components/admin/ProductFormModal';
import ProfitIndicator from '../../components/admin/ProfitIndicator';
import { ProductStore, PRODUCT_CATEGORIES, getProfitStatus } from '../../data/productStore';
import { exportProductsToExcel } from '../../utils/excelExport';

const ITEMS_PER_PAGE = 20;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load products
    useEffect(() => {
        setProducts(ProductStore.getAllProducts());

        // Subscribe to changes
        const unsubscribe = ProductStore.subscribe((updatedProducts) => {
            setProducts([...updatedProducts]);
        });

        return () => unsubscribe();
    }, []);

    // Filtered and sorted products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.product_name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.provider_name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            result = result.filter(p => p.category === categoryFilter);
        }

        // Stock filter
        if (stockFilter !== 'all') {
            result = result.filter(p => p.stock_status === stockFilter);
        }

        // Active filter
        if (activeFilter !== 'all') {
            result = result.filter(p => p.is_active === (activeFilter === 'active'));
        }

        // Sort
        result.sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [products, searchQuery, categoryFilter, stockFilter, activeFilter, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handlers
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            ProductStore.deleteProduct(id);
        }
    };

    const handleToggleActive = (id) => {
        ProductStore.toggleActive(id);
    };

    const handleToggleFeatured = (id) => {
        ProductStore.toggleFeatured(id);
    };

    const handleExport = () => {
        exportProductsToExcel(filteredProducts);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const getStockBadge = (status) => {
        const config = {
            in_stock: { icon: CheckCircle, className: 'bg-success/10 text-success border-success/20', label: 'In Stock' },
            out_of_stock: { icon: XCircle, className: 'bg-error/10 text-error border-error/20', label: 'Out of Stock' },
            limited: { icon: AlertCircle, className: 'bg-warning/10 text-warning border-warning/20', label: 'Limited' }
        };
        const { icon: Icon, className, label } = config[status] || config.in_stock;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
                <Icon size={12} /> {label}
            </span>
        );
    };

    const getCategoryName = (categoryId) => {
        const cat = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
        return cat ? cat.name : categoryId;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#1a1a1a]/40 border border-white/5 p-4 lg:p-6 rounded-2xl backdrop-blur-md">
                <div>
                    <h1 className="text-2xl font-bold text-white font-display">Product Management</h1>
                    <p className="text-gray-400 text-sm">
                        {filteredProducts.length} products found
                        {searchQuery && ` for "${searchQuery}"`}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative group flex-1 lg:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search products, SKU, provider..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full lg:w-72 bg-black/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Filters */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                        className="bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">All Categories</option>
                        {PRODUCT_CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <select
                        value={stockFilter}
                        onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
                        className="bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">All Stock</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="limited">Limited</option>
                    </select>

                    <select
                        value={activeFilter}
                        onChange={(e) => { setActiveFilter(e.target.value); setCurrentPage(1); }}
                        className="bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {/* Actions */}
                    <Button variant="outline" onClick={handleExport} className="gap-2">
                        <Download size={16} /> Export
                    </Button>
                    <Button onClick={handleAddNew} className="gap-2">
                        <Plus size={16} /> Add Product
                    </Button>
                </div>
            </header>

            {/* Products Table */}
            <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-white/5 text-xs uppercase text-gray-400 border-b border-white/10">
                                <th className="px-4 py-4 font-medium w-12">Image</th>
                                <th className="px-4 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('product_name')}>
                                    <span className="flex items-center gap-1">
                                        Product <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-4 font-medium">Category</th>
                                <th className="px-4 py-4 font-medium">Validity</th>
                                <th className="px-4 py-4 font-medium text-red-400">🔒 Provider</th>
                                <th className="px-4 py-4 font-medium text-red-400 cursor-pointer hover:text-red-300 transition-colors" onClick={() => handleSort('provider_cost')}>
                                    <span className="flex items-center gap-1">
                                        Cost (₹) <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-4 font-medium text-green-400 cursor-pointer hover:text-green-300 transition-colors" onClick={() => handleSort('selling_price')}>
                                    <span className="flex items-center gap-1">
                                        Price (₹) <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('profit_percentage')}>
                                    <span className="flex items-center gap-1">
                                        Profit <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-4 font-medium">Stock</th>
                                <th className="px-4 py-4 font-medium text-center">Status</th>
                                <th className="px-4 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedProducts.map((product) => {
                                const profitStatus = getProfitStatus(product.profit_percentage);
                                return (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                        {/* Image */}
                                        <td className="px-4 py-3">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.product_name}
                                                    className="w-10 h-10 rounded-lg object-contain bg-white/5 filter invert"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                                                    📦
                                                </div>
                                            )}
                                        </td>

                                        {/* Product Name & SKU */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                {product.is_featured && (
                                                    <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <p className="font-medium text-white">{product.product_name}</p>
                                                    <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 py-3 text-sm text-gray-300">
                                            {getCategoryName(product.category)}
                                        </td>

                                        {/* Validity */}
                                        <td className="px-4 py-3 text-sm text-gray-300">
                                            {product.validity}
                                        </td>

                                        {/* Provider (Admin Only - Red) */}
                                        <td className="px-4 py-3">
                                            <span className="text-sm font-medium text-red-400">
                                                {product.provider_name}
                                            </span>
                                        </td>

                                        {/* Provider Cost (Admin Only - Red BG) */}
                                        <td className="px-4 py-3">
                                            <span className="inline-block bg-red-500/10 text-red-400 px-2 py-1 rounded text-sm font-medium">
                                                ₹{product.provider_cost}
                                            </span>
                                        </td>

                                        {/* Selling Price (Green BG) */}
                                        <td className="px-4 py-3">
                                            <span className="inline-block bg-success/10 text-success px-2 py-1 rounded text-sm font-medium">
                                                ₹{product.selling_price}
                                            </span>
                                        </td>

                                        {/* Profit */}
                                        <td className="px-4 py-3">
                                            <ProfitIndicator
                                                profitAmount={product.profit_amount}
                                                profitPercentage={product.profit_percentage}
                                                size="small"
                                            />
                                        </td>

                                        {/* Stock Status */}
                                        <td className="px-4 py-3">
                                            {getStockBadge(product.stock_status)}
                                        </td>

                                        {/* Active Status */}
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleToggleActive(product.id)}
                                                className={`p-1.5 rounded-lg transition-colors ${product.is_active
                                                        ? 'text-success hover:bg-success/10'
                                                        : 'text-gray-500 hover:bg-white/5'
                                                    }`}
                                                title={product.is_active ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                                            >
                                                {product.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleToggleFeatured(product.id)}
                                                    className={`p-2 rounded-lg transition-colors ${product.is_featured
                                                            ? 'text-yellow-500 hover:bg-yellow-500/10'
                                                            : 'text-gray-400 hover:text-yellow-500 hover:bg-white/5'
                                                        }`}
                                                    title={product.is_featured ? 'Remove from featured' : 'Add to featured'}
                                                >
                                                    <Star size={16} className={product.is_featured ? 'fill-current' : ''} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Edit product"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                                    title="Delete product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {paginatedProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-400 mb-4">No products found</p>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus size={16} /> Add Your First Product
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let page;
                                if (totalPages <= 5) {
                                    page = i + 1;
                                } else if (currentPage <= 3) {
                                    page = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    page = totalPages - 4 + i;
                                } else {
                                    page = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                ? 'bg-primary text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Form Modal */}
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                product={selectedProduct}
                onSave={() => { }}
            />
        </div>
    );
};

export default ProductsPage;
