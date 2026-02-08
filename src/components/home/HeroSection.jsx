import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { LOGOS } from '../../data/products';

const HERO_CARDS = [
    { id: 'netflix', name: 'Netflix Premium', price: 499, originalPrice: 7788, logo: LOGOS.netflix },
    { id: 'youtube', name: 'YouTube Premium', price: 279, originalPrice: 1668, logo: LOGOS.youtube },
    { id: 'capcut', name: 'CapCut Pro', price: 199, originalPrice: 999, logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/capcut.svg' }, // Providing direct SVG for CapCut if not in LOGOS
    { id: 'gemini', name: 'Gemini Advanced', price: 399, originalPrice: 1950, logo: LOGOS.gemini },
    { id: 'spotify', name: 'Spotify Premium', price: 449, originalPrice: 1428, logo: LOGOS.spotify },
];

const HeroSection = () => {
    const [cards, setCards] = useState(HERO_CARDS);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) => {
                const newCards = [...prevCards];
                const firstCard = newCards.shift();
                newCards.push(firstCard);
                return newCards;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Dynamic Background */}
            {/* Dynamic Background Removed - Using Global SpaceBackground */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Only keeping subtle gradients if needed, otherwise empty to show global bg */}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
                                <span className="text-sm font-medium text-gray-300">Over 5000+ Active Products</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">Premium Subs at </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">90% OFF</span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Get distinct genuine activation keys & premium subscriptions for Netflix, Spotify, Windows, and AI tools instantly.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button size="lg" className="w-full sm:w-auto shadow-primary/25 shadow-xl group">
                                Browse All Products
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>
                            <Link to="/deals">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    <Zap className="mr-2 text-warning" size={20} />
                                    Today's Deals
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
                        >
                            {[
                                { label: 'Happy Customers', value: '10,000+' },
                                { label: 'Products', value: '5,000+' },
                                { label: 'Support', value: '24/7' },
                            ].map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl md:text-3xl font-bold text-white font-display">{stat.value}</div>
                                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Visual - Heroic 3D Card Stack */}
                    <div className="relative hidden lg:flex h-[600px] w-full items-center justify-center perspective-1000">
                        <div className="relative w-80 h-[450px]">
                            <AnimatePresence mode="popLayout">
                                {cards.map((card, index) => {
                                    // Only show top 3 cards for performance and visual clarity
                                    if (index > 2) return null;

                                    return (
                                        <motion.div
                                            key={card.id}
                                            layoutId={card.id}
                                            initial={{ scale: 0.9, y: 50, opacity: 0, z: -100 }}
                                            animate={{
                                                scale: index === 0 ? 1 : 1 - index * 0.05, // Front card largest
                                                y: index * 20, // Stack effect downwards
                                                z: -index * 50, // Depth effect
                                                opacity: 1 - index * 0.15,
                                                zIndex: cards.length - index,
                                                rotateX: index === 0 ? 0 : 5, // Slight tilt for back cards
                                            }}
                                            exit={{
                                                x: -100, // Slide out to left
                                                y: 20,
                                                opacity: 0,
                                                rotate: -10,
                                                scale: 0.9,
                                                transition: { duration: 0.4 }
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20,
                                                mass: 1
                                            }}
                                            className="absolute inset-0 rounded-3xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
                                            style={{
                                                background: index === 0
                                                    ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                                                    : 'rgba(0,0,0,0.6)',
                                                boxShadow: index === 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
                                                transformStyle: 'preserve-3d'
                                            }}
                                        >
                                            {/* Glow Effect for front card */}
                                            {index === 0 && (
                                                <>
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                                                </>
                                            )}

                                            {/* Card Content */}
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Logo Area with improved visibility */}
                                                <div className="h-48 bg-gray-900/50 rounded-2xl mb-6 flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:border-primary/30 transition-colors">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                    {/* Logo Container - White background for visibility */}
                                                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg p-4 transform group-hover:scale-110 transition-transform duration-500">
                                                        <img
                                                            src={card.logo}
                                                            alt={card.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">{card.name}</h3>

                                                <div className="flex justify-between items-end mt-auto mb-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Original Price</span>
                                                        <span className="text-gray-500 line-through text-lg">₹{card.originalPrice}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-black font-bold bg-primary px-2 py-1 rounded-md mb-2 inline-block shadow-lg shadow-primary/25">
                                                            SAVE 90%
                                                        </span>
                                                        <div className="text-3xl font-bold text-white tracking-tight">₹{card.price}</div>
                                                    </div>
                                                </div>

                                                <Button size="lg" className="w-full bg-white text-black hover:bg-gray-100 border-none font-bold">
                                                    Get It Now
                                                </Button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
