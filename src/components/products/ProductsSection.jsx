import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS, PRODUCT_CATEGORIES, getProductsByCategory, getFeaturedProducts, searchProducts } from '../../data/products';

const ProductsSection = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        let products = activeCategory === 'all'
            ? PRODUCTS
            : getProductsByCategory(activeCategory);

        if (searchQuery.trim()) {
            products = searchProducts(searchQuery).filter(p =>
                activeCategory === 'all' || p.category === activeCategory
            );
        }

        return products;
    }, [activeCategory, searchQuery]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
                        Browse All <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Products</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Premium subscriptions at unbeatable prices. Instant delivery, 24/7 support.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto mb-8"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products (Netflix, ChatGPT, Windows...)"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide"
                >
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        All Products
                    </button>
                    {PRODUCT_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === cat.id
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-400">
                        Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Filter size={14} />
                        <span>Sort by popularity</span>
                    </div>
                </div>

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
                        <p className="text-gray-400">Try adjusting your search or filter</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsSection;
