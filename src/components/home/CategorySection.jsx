import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCT_CATEGORIES, getProductsByCategory } from '../../data/products';

const CategorySection = () => {
    const scrollContainerRef = useRef(null);

    return (
        <section className="py-20 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">Browse by Category</h2>
                        <p className="text-gray-400">Explore our vast collection of premium digital products</p>
                    </div>
                    <Link
                        to="/products"
                        className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        View All Products →
                    </Link>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    {PRODUCT_CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-none w-40 sm:w-48 group"
                        >
                            <Link to={`/products/${category.id}`}>
                                <div className={`h-full bg-gradient-to-br ${category.color} bg-opacity-10 border border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-primary/10 glass cursor-pointer`}>
                                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                                        <span className="text-3xl">{category.icon}</span>
                                    </div>
                                    <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                    <span className="text-xs text-gray-400">
                                        {getProductsByCategory(category.id).length} Products
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="md:hidden text-center mt-4">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        View All Products →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
