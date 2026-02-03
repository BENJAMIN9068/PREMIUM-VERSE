import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Wait a bit before unmounting
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative mb-8">
                {/* Rocket Icon or Graphic */}
                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                </motion.div>

                {/* Thrust particles */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-transparent to-blue-500 blur-md rounded-full"
                    animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
            </div>

            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="h-full bg-white shadow-[0_0_10px_white]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-white/60 text-sm">
                SYSTEM LOADING... <span className="text-white font-bold">{progress}%</span>
            </div>
        </motion.div>
    );
};

export default Preloader;
