import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight;

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFFFFF';

            stars.forEach(star => {
                star.y -= star.speed;
                if (star.y < 0) star.y = canvas.height;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth / 2;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Side - Animated Space Background (Desktop only) */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 flex-col justify-center items-center overflow-hidden bg-space-gradient border-r border-white/5">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

                <div className="relative z-10 p-12 text-center max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl font-bold font-display text-white mb-6 leading-tight"
                    >
                        Unlock Premium Access
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-gray-300 leading-relaxed"
                    >
                        Join thousands of users getting premium subscriptions at up to 90% off. Secure, instant, and guaranteed.
                    </motion.p>
                </div>

                {/* Floating Elements for Decoration */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            {/* Right Side - Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0" />
                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white font-display tracking-tight border-b border-white/10 pb-4 inline-block lg:block lg:border-none lg:pb-0">{title}</h2>
                        {subtitle && <p className="mt-2 text-sm text-gray-400">{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
