// Public Deals Page - Today's Deals for customers
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingCart, Clock, Gift, Star, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { DealsStore, calculateDealSavings, getDealConditionText, isDealExpiringSoon } from '../../data/dealsStore';

const PublicDealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [featuredDeals, setFeaturedDeals] = useState([]);

    useEffect(() => {
        const activeDeals = DealsStore.getActiveDeals();
        setDeals(activeDeals);
        setFeaturedDeals(activeDeals.filter(d => d.is_featured));
    }, []);

    const DealCard = ({ deal, featured = false }) => {
        const savings = calculateDealSavings(deal);
        const condition = getDealConditionText(deal);
        const expiringSoon = isDealExpiringSoon(deal);
        const isFree = deal.deal_price === 0;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border ${featured ? 'border-warning/40' : 'border-white/10'
                    } rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
            >
                {/* Featured Badge */}
                {featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-warning to-orange-500 text-black text-xs font-bold py-1 px-3 text-center flex items-center justify-center gap-1">
                        <Star size={12} className="fill-current" /> FEATURED DEAL
                    </div>
                )}

                {/* Expiring Soon Badge */}
                {expiringSoon && (
                    <div className="absolute top-3 right-3 bg-error/90 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <Clock size={10} /> Ending Soon!
                    </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-full">
                    {savings.percentage}% OFF
                </div>

                {/* Product Image */}
                <div className={`p-6 ${featured ? 'pt-10' : 'pt-10'}`}>
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800/50 to-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                        {deal.product_image ? (
                            <img
                                src={deal.product_image}
                                alt={deal.product_name}
                                className="h-20 w-auto object-contain"
                            />
                        ) : (
                            <Gift size={48} className="text-gray-500" />
                        )}
                    </div>

                    {/* Product Info */}
                    <h3 className="text-xl font-bold text-white mb-2">{deal.product_name}</h3>

                    {/* Pricing */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-400 line-through text-sm">₹{deal.original_price}</span>
                        <span className={`text-3xl font-bold ${isFree ? 'text-success' : 'text-warning'}`}>
                            {isFree ? 'FREE!' : `₹${deal.deal_price}`}
                        </span>
                    </div>

                    {/* Savings Info */}
                    <p className="text-sm text-success mb-3">
                        You save ₹{savings.savings}
                    </p>

                    {/* Condition */}
                    {condition && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
                            <ShoppingCart size={16} className="text-primary" />
                            <span className="text-sm text-primary font-medium">{condition}</span>
                        </div>
                    )}

                    {/* Description */}
                    {deal.description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{deal.description}</p>
                    )}

                    {/* CTA Button */}
                    <Button className="w-full gap-2 group">
                        <ShoppingCart size={16} />
                        {isFree ? 'Claim Free' : 'Add to Cart'}
                        <Sparkles size={14} className="group-hover:animate-spin" />
                    </Button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warning/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                {/* Header */}
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-warning/20 border border-warning/30 rounded-full px-4 py-2 mb-4"
                    >
                        <Zap className="text-warning" size={20} />
                        <span className="text-warning font-semibold">Limited Time Offers</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold font-display mb-4"
                    >
                        Today's <span className="text-warning">Hot Deals</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Exclusive discounts and FREE products! Shop more to unlock amazing deals.
                    </motion.p>
                </header>

                {/* Featured Deals Section */}
                {featuredDeals.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Star className="text-warning fill-warning" size={24} />
                            Featured Deals
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredDeals.map((deal, index) => (
                                <motion.div
                                    key={deal.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <DealCard deal={deal} featured={true} />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Deals Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="text-primary" size={24} />
                        All Deals ({deals.length})
                    </h2>

                    {deals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {deals.map((deal, index) => (
                                <motion.div
                                    key={deal.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <DealCard deal={deal} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#1a1a1a]/40 border border-white/10 rounded-2xl">
                            <Zap size={64} className="mx-auto text-gray-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Active Deals Right Now</h3>
                            <p className="text-gray-400 mb-6">Check back soon for amazing offers!</p>
                            <Link to="/">
                                <Button>Browse Products</Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Info Banner */}
                <section className="mt-12 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">💡 How Deals Work</h3>
                    <p className="text-gray-300">
                        Some deals require a minimum purchase amount. Add items to your cart worth the required amount,
                        and the deal product will be available at the special price or FREE!
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PublicDealsPage;
