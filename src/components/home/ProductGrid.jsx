import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Zap, Shield, Check } from 'lucide-react';
import Button from '../ui/Button';

const PRODUCTS = [
    // STREAMING
    {
        id: 1,
        name: 'Netflix Premium',
        category: 'Streaming',
        price: 499,
        originalPrice: 7788,
        rating: 4.8,
        reviews: 2450,
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Best Seller', 'Instant']
    },
    {
        id: 2,
        name: 'Amazon Prime Video',
        category: 'Streaming',
        price: 299,
        originalPrice: 1499,
        rating: 4.7,
        reviews: 1800,
        image: 'https://images.unsplash.com/photo-1522869635100-1f4d06ee5f78?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Hot Deal']
    },
    {
        id: 3,
        name: 'Disney+ Hotstar VIP',
        category: 'Streaming',
        price: 199,
        originalPrice: 899,
        rating: 4.6,
        reviews: 1200,
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=300&h=200',
        tags: []
    },
    {
        id: 4,
        name: 'Spotify Premium',
        category: 'Music',
        price: 299,
        originalPrice: 1189,
        rating: 4.9,
        reviews: 3000,
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Best Seller']
    },
    // AI TOOLS
    {
        id: 6,
        name: 'ChatGPT Plus',
        category: 'AI Tools',
        price: 399,
        originalPrice: 1656,
        rating: 4.9,
        reviews: 5000,
        image: 'https://images.unsplash.com/photo-1678258872013-17b5f58c735d?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Trending', 'Instant']
    },
    {
        id: 7,
        name: 'Midjourney Standard',
        category: 'AI Tools',
        price: 599,
        originalPrice: 2483,
        rating: 4.8,
        reviews: 800,
        image: 'https://images.unsplash.com/photo-1684369175836-3a619084260d?auto=format&fit=crop&q=80&w=300&h=200',
        tags: []
    },
    // SOFTWARE
    {
        id: 10,
        name: 'Windows 11 Pro',
        category: 'Software',
        price: 599,
        originalPrice: 14500,
        rating: 4.7,
        reviews: 4200,
        image: 'https://images.unsplash.com/photo-1677610057038-daa53a7ac7b1?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Lifetime']
    },
    {
        id: 11,
        name: 'Office 2021 Pro',
        category: 'Software',
        price: 799,
        originalPrice: 29999,
        rating: 4.8,
        reviews: 3800,
        image: 'https://images.unsplash.com/photo-1633511090164-b43840ea89b9?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Lifetime']
    },
    // VPN
    {
        id: 17,
        name: 'NordVPN Premium',
        category: 'VPN',
        price: 499,
        originalPrice: 9156,
        rating: 4.8,
        reviews: 1500,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&q=80&w=300&h=200',
        tags: []
    },
    // GAMING
    {
        id: 19,
        name: 'Xbox Game Pass',
        category: 'Gaming',
        price: 599,
        originalPrice: 1499,
        rating: 4.9,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=300&h=200',
        tags: ['Hot Deal']
    }
];

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden glass hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
        >
            {/* Badges */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
                <span className="bg-error text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg shadow-error/20">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
                {product.tags.map(tag => (
                    <span key={tag} className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg shadow-primary/20">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-3 left-3 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full text-gray-300 hover:text-error hover:bg-white transition-all">
                <Heart size={16} />
            </button>

            {/* Image */}
            <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                    <Star className="text-yellow-500 fill-current" size={14} />
                    <span className="text-sm font-medium text-white">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-400">
                        <Check size={12} className="text-success mr-1.5" />
                        Instant Delivery
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                        <Shield size={12} className="text-primary mr-1.5" />
                        Lifetime Validity
                    </div>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-white/5">
                    <div>
                        <p className="text-xs text-gray-500 line-through">₹{product.originalPrice}</p>
                        <p className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">₹{product.price}</p>
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
                    <Button variant="outline" className="mt-4 md:mt-0">View All Products</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
