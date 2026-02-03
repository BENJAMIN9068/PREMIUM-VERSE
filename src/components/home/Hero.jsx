import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Starfield from '../ui/Starfield';
import { Suspense } from 'react';
import clsx from 'clsx';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

const FloatingCard = ({ title, price, color, delay, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
                opacity: 1,
                y: [0, -20, 0],
                rotateX: [0, 5, 0],
                rotateY: [0, 5, 0]
            }}
            transition={{
                opacity: { duration: 1, delay },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
                rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
            }}
            className={clsx(
                "absolute w-64 h-80 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-colors shadow-2xl",
                className
            )}
            style={{
                boxShadow: `0 0 30px -5px ${color}33`,
            }}
        >
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center border border-white/10">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                </div>
                <span className="text-xs font-mono text-white/50">PREMIUM</span>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/60 text-sm">Lifetime Access</p>
            </div>

            <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white tracking-tight">{price}</span>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/5">
                    Buy Now
                </button>
            </div>

            {/* Glossy overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
    );
};

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background stars */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <Starfield />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

                {/* Text Side */}
                <div className="text-left select-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-white/70 uppercase tracking-widest">System Online</span>
                        </div>

                        <div className="mb-8 min-h-[160px]">
                            <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-[0.9]">
                                Upgrade Your <br />
                                <TypeAnimation
                                    sequence={[
                                        'Digital Life',
                                        2000,
                                        'Workflow',
                                        2000,
                                        'Experience',
                                        2000
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    className="text-stroke-white text-transparent"
                                    cursor={true}
                                />
                            </h1>
                        </div>

                        <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
                            Premium digital assets delivered at light speed. Experience the future of e-commerce with our curated collection of software keys and subscriptions.
                        </p>

                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-black font-bold rounded-full relative overflow-hidden group"
                            >
                                <span className="relative z-10">Start Exploring</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </motion.button>

                            <button className="px-8 py-4 text-white font-medium hover:text-primary transition-colors">
                                View Catalog
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <div className="font-bold text-white flex items-center gap-1">
                                    <CountUp end={10000} duration={2.5} separator="," />+
                                    <span className="text-primary">Happy Customers</span>
                                </div>
                                <div className="text-white/70 text-xs">Rated 4.9/5 stars</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Cards Side */}
                <div className="relative h-full hidden lg:flex items-center justify-center perspective-1000">
                    {/* Card 1: Netflix (Background) */}
                    <FloatingCard
                        title="Netflix 4K"
                        price="$12"
                        color="#E50914"
                        delay={0}
                        className="z-10 -translate-x-20 translate-y-20 scale-90 opacity-60 blur-[1px]"
                    />

                    {/* Card 2: ChatGPT (Foreground Main) */}
                    <FloatingCard
                        title="ChatGPT Plus"
                        price="$20"
                        color="#10A37F"
                        delay={0.2}
                        className="z-20 translate-x-0 translate-y-0"
                    />

                    {/* Card 3: Windows (Background Right) */}
                    <FloatingCard
                        title="Windows 11"
                        price="$15"
                        color="#0078D6"
                        delay={0.4}
                        className="z-10 translate-x-20 -translate-y-20 scale-90 opacity-60 blur-[1px]"
                    />
                </div>
            </div>

            {/* Light leaks/Gradients */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-20 z-0"></div>
        </section>
    );
};

export default Hero;
