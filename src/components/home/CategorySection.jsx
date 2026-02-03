import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Tv, Cpu, Terminal, Shield, Globe, Gamepad2, Music, Cloud, Briefcase, Gift } from 'lucide-react';

const CATEGORIES = [
    { id: 1, name: 'Streaming', icon: Tv, count: '150+' },
    { id: 2, name: 'AI Tools', icon: Cpu, count: '80+' },
    { id: 3, name: 'Software', icon: Terminal, count: '200+' },
    { id: 4, name: 'Antivirus', icon: Shield, count: '45+' },
    { id: 5, name: 'VPN', icon: Globe, count: '30+' },
    { id: 6, name: 'Gaming', icon: Gamepad2, count: '500+' },
    { id: 7, name: 'Music', icon: Music, count: '60+' },
    { id: 8, name: 'Storage', icon: Cloud, count: '25+' },
    { id: 9, name: 'Productivity', icon: Briefcase, count: '100+' },
    { id: 10, name: 'Gift Cards', icon: Gift, count: '50+' },
];

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
                    <div className="hidden md:flex gap-2">
                        {/* Scroll buttons could go here */}
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-none w-40 sm:w-48 group cursor-pointer"
                        >
                            <div className="h-full bg-white/5 border border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-primary/10 glass">
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-300">
                                    <category.icon size={28} />
                                </div>
                                <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                <span className="text-xs text-gray-500">{category.count} Products</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
