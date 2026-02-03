import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Filter, Grid3X3, List } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SpaceBackground from '../../components/ui/SpaceBackground';
import ProductCard from '../../components/products/ProductCard';
import { PRODUCTS, PRODUCT_CATEGORIES, getProductsByCategory, getCategoryById, searchProducts } from '../../data/products';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    const category = getCategoryById(categoryId);
    const isAllProducts = !categoryId || categoryId === 'all';

    const filteredProducts = useMemo(() => {
        let products = isAllProducts ? PRODUCTS : getProductsByCategory(categoryId);

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.plan.toLowerCase().includes(q)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                products = [...products].sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products = [...products].sort((a, b) => b.price - a.price);
                break;
            case 'discount':
                products = [...products].sort((a, b) => {
                    const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                    const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                    return discountB - discountA;
                });
                break;
            case 'popular':
            default:
                // Badged products first
                products = [...products].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        }

        return products;
    }, [categoryId, isAllProducts, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceBackground />
            <div className="relative z-10">
                <Navbar />

                <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <Link to="/home" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                        {!isAllProducts && (
                            <>
                                <span>/</span>
                                <span className="text-white">{category?.name}</span>
                            </>
                        )}
                    </div>

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Link to="/products" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <ChevronLeft size={20} />
                            </Link>
                            {!isAllProducts && <span className="text-4xl">{category?.icon}</span>}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold font-display">
                                    {isAllProducts ? 'All Products' : category?.name}
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    {isAllProducts ? 'Browse our complete collection' : category?.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Category Quick Links (only on all products page) */}
                    {isAllProducts && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide"
                        >
                            {PRODUCT_CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/products/${cat.id}`}
                                    className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all group"
                                >
                                    <span className="text-xl">{cat.icon}</span>
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{cat.name}</span>
                                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                                        {getProductsByCategory(cat.id).length}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    )}

                    {/* Filters Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search in ${isAllProducts ? 'all products' : category?.name}...`}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            />
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="discount">Highest Discount</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-400 mb-6">
                        Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                    </p>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or filter</p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors"
                            >
                                <ChevronLeft size={16} /> View All Products
                            </Link>
                        </div>
                    )}

                    {/* Other Categories (when viewing a specific category) */}
                    {!isAllProducts && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16"
                        >
                            <h2 className="text-xl font-bold text-white mb-6">Browse Other Categories</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {PRODUCT_CATEGORIES.filter(c => c.id !== categoryId).map((cat) => (
                                    <Link
                                        key={cat.id}
                                        to={`/products/${cat.id}`}
                                        className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all text-center group"
                                    >
                                        <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default CategoryPage;
