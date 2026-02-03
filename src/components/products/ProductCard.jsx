import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { getDiscountPercentage } from '../../data/products';

const ProductCard = ({ product, index }) => {
    const discount = getDiscountPercentage(product);

    const getBadgeStyle = (badge) => {
        switch (badge) {
            case 'Best Seller':
                return 'bg-gradient-to-r from-primary to-secondary text-white';
            case 'Hot':
                return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
            case 'Popular':
                return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
            case 'Best Value':
                return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
            case 'Lifetime':
                return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black';
            case 'New':
                return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
            case 'Pro':
                return 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white';
            default:
                return 'bg-white/10 text-white';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
        >
            {/* Badge */}
            {product.badge && (
                <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(product.badge)}`}>
                    {product.badge}
                </div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-10 bg-success/90 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {discount}% OFF
            </div>

            {/* Product Logo */}
            <div className="h-28 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center group-hover:from-primary/10 transition-colors p-4">
                {product.logo ? (
                    <img
                        src={product.logo}
                        alt={product.name}
                        className="w-16 h-16 object-contain filter invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span class="text-5xl">${product.image || '📦'}</span>`;
                        }}
                    />
                ) : (
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {product.image || '📦'}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1 truncate group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{product.plan}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-white">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <ShoppingCart size={14} />
                    Add to Cart
                </button>

                {/* Quick Add (shows when not hovering) */}
                <div className="flex items-center justify-between text-xs text-gray-400 group-hover:hidden">
                    <span className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" /> 4.9
                    </span>
                    <span className="flex items-center gap-1">
                        <Zap size={12} className="text-primary" /> Instant
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
