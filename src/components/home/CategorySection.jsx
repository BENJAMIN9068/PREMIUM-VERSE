import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCT_CATEGORIES, getProductsByCategory } from '../../data/products';
import CategoryIcon from '../products/CategoryIcon';

const CategorySection = () => {
    // Duplicate categories for seamless marquee
    const marqueeCategories = [...PRODUCT_CATEGORIES, ...PRODUCT_CATEGORIES];

    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">Browse by Category</h2>
                        <p className="text-gray-400">Explore our vast collection of premium digital products</p>
                    </div>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden relative w-full">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjust speed here (slower is more professional)
                            ease: "linear",
                        },
                    }}
                    style={{ width: "max-content" }}
                >
                    {marqueeCategories.map((category, index) => (
                        <Link key={`${category.id}-${index}`} to={`/products/${category.id}`} className="group relative">
                            <div className={`w-52 h-32 bg-gradient-to-br ${category.color} bg-opacity-5 border border-white/10 hover:border-primary/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/10 glass`}>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                                    <CategoryIcon id={category.id} className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-white font-medium text-sm group-hover:text-primary transition-colors">{category.name}</h3>
                                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                                    {getProductsByCategory(category.id).length} Products
                                </span>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CategorySection;
