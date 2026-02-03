import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { getFeaturedProducts, getDiscountPercentage } from '../../data/products';

const ProductCard = ({ product, index }) => {
    const discount = getDiscountPercentage(product);

    const getBadgeStyle = (badge) => {
        switch (badge) {
            case 'Best Seller':
                return 'bg-gradient-to-r from-primary to-secondary';
            case 'Hot':
                return 'bg-gradient-to-r from-red-500 to-orange-500';
            case 'Popular':
                return 'bg-gradient-to-r from-purple-500 to-pink-500';
            case 'Best Value':
                return 'bg-gradient-to-r from-green-500 to-emerald-500';
            case 'Lifetime':
                return 'bg-gradient-to-r from-yellow-500 to-amber-500 !text-black';
            case 'New':
                return 'bg-gradient-to-r from-blue-500 to-cyan-500';
            case 'Pro':
                return 'bg-gradient-to-r from-indigo-500 to-violet-500';
            default:
                return 'bg-primary';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden glass hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
        >
            {/* Badges */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
                <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                    {discount}% OFF
                </span>
                {product.badge && (
                    <span className={`text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg ${getBadgeStyle(product.badge)}`}>
                        {product.badge}
                    </span>
                )}
            </div>

            {/* Logo */}
            <div className="h-32 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent group-hover:from-primary/10 transition-colors p-4">
                {product.logo ? (
                    <img
                        src={product.logo}
                        alt={product.name}
                        className="w-16 h-16 object-contain filter invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <span className="text-5xl group-hover:scale-110 transition-transform">📦</span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{product.plan}</p>

                <div className="flex items-center space-x-2 mb-4">
                    <Star className="text-yellow-500 fill-current" size={14} />
                    <span className="text-sm font-medium text-white">4.9</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Zap size={12} className="text-primary" /> Instant
                    </span>
                </div>

                <div className="flex items-end justify-between pt-3 border-t border-white/5">
                    <div>
                        <p className="text-xs text-gray-500 line-through">₹{product.originalPrice}</p>
                        <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">₹{product.price}</p>
                    </div>
                    <Button size="sm" className="rounded-full !px-3 shadow-none">
                        <ShoppingCart size={18} />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const featuredProducts = getFeaturedProducts();

    return (
        <section className="py-20 bg-transparent relative">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                            Premium Deals <span className="text-transparent bg-clip-text bg-gradient-to-r from-error to-orange-500">Limited Time</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Grab these exclusive offers before they expire. Genuine licenses with full warranty and support.
                        </p>
                    </div>
                    <Link to="/products">
                        <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-2">
                            View All Products <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.slice(0, 8).map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* View More Link */}
                <div className="text-center mt-10">
                    <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline">
                        Browse all {featuredProducts.length}+ products <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
