import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection = () => {
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
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                <Zap className="mr-2 text-warning" size={20} />
                                Today's Deals
                            </Button>
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

                    {/* Right Visual - 3D/Floating Cards Effect */}
                    <div className="relative hidden lg:block h-[600px] w-full perspective-1000">
                        <motion.div
                            animate={{
                                y: [-20, 20, -20],
                                rotateX: [0, 5, 0],
                                rotateY: [0, -5, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 flex items-center justify-center preserve-3d"
                        >
                            {/* Central Card */}
                            <div className="relative w-80 h-96 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500 z-20 overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-2xl"></div>
                                <div className="h-40 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 flex items-center justify-center border border-white/5">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                                        alt="Netflix"
                                        className="h-16 w-auto"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Netflix Premium</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-400 line-through text-sm">₹7,788</span>
                                    <span className="text-2xl font-bold text-primary">₹499</span>
                                </div>
                                <Button size="sm" className="w-full">Buy Now</Button>
                            </div>

                            {/* Floating Elements Background */}
                            <div className="absolute top-10 right-10 w-64 h-80 bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl transform translate-z-[-50px] rotate-12 z-10 p-4">
                                <div className="h-full w-full bg-white/5 rounded-xl"></div>
                            </div>
                            <div className="absolute bottom-10 left-10 w-64 h-80 bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl transform translate-z-[-50px] -rotate-12 z-10 p-4">
                                <div className="h-full w-full bg-white/5 rounded-xl"></div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
