import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Tilt from 'react-parallax-tilt';
import { RotateCw, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, index }) => {
    const ref = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <motion.div ref={ref} style={{ y }} className={clsx("relative perspective-1000", index % 2 === 0 ? "mt-0" : "mt-20")}>
            <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                className="w-full h-full"
            >
                <motion.div
                    className="relative w-full aspect-[3/4] transition-all duration-500 preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                        <div className={clsx("absolute inset-0 bg-gradient-to-b opacity-80", product.gradient)}></div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                            <div className="flex justify-between items-start">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-md border border-white/10">
                                    {product.category}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <RotateCw size={16} />
                                </button>
                            </div>

                            <div>
                                <h3 className="text-3xl font-display font-bold mb-2">{product.name}</h3>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-2xl font-bold">{product.price}</span>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-primary transition-colors hover:scale-105 active:scale-95">
                                        <ShoppingCart size={16} /> Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-black/90 backdrop-blur-md p-8 rotate-y-180 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Features</h3>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <RotateCw size={16} />
                                </button>
                            </div>
                            <ul className="space-y-4">
                                <li className="text-sm text-white/80">• Instant Delivery</li>
                                <li className="text-sm text-white/80">• Global Activation</li>
                                <li className="text-sm text-white/80">• 24/7 Support</li>
                                <li className="text-sm text-white/80">• Official Key</li>
                            </ul>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-primary text-black font-bold mt-4 hover:brightness-110">
                            Add to Cart
                        </button>
                    </div>
                </motion.div>
            </Tilt>
        </motion.div>
    );
};

const ProductShowcase = () => {
    const products = [
        {
            name: "ChatGPT Plus",
            category: "AI Tools",
            price: "$20",
            description: "Unlock the full potential of AI with GPT-4 access and faster response times.",
            gradient: "from-green-500/20 to-black"
        },
        {
            name: "Netflix Premium",
            category: "Entertainment",
            price: "$12",
            description: "4K UHD streaming with spatial audio. Shared family plan access.",
            gradient: "from-red-500/20 to-black"
        },
        {
            name: "Adobe CC",
            category: "Creative",
            price: "$30",
            description: "Full suite access including Photoshop, Illustrator, and Premiere Pro.",
            gradient: "from-blue-500/20 to-black"
        },
        {
            name: "Windows 11 Pro",
            category: "Software",
            price: "$15",
            description: "Official retail key for Windows 11 Professional edition.",
            gradient: "from-purple-500/20 to-black"
        }
    ];

    return (
        <section className="py-32 px-6 relative z-10 bg-black" id="store">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-bold mb-6"
                    >
                        Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Collection</span>
                    </motion.h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Explore our curated universe of premium digital assets. Each key is verified and delivered instantly via hyperspace transmission.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
