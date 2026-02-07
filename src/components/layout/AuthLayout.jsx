import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let lastTime = 0;

        const setSize = () => {
            // Layout is split 50/50 on desktop
            canvas.width = window.innerWidth >= 1024 ? window.innerWidth / 2 : window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: (Math.random() * 0.5 + 0.1) * 60, // Normalize speed for delta time
        }));

        const animate = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;
            const dt = Math.min(deltaTime, 0.1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFFFFF';

            stars.forEach(star => {
                star.y -= star.speed * dt;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            setSize();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Animated Space Background (Desktop only) */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 flex-col justify-center items-center overflow-hidden bg-black border-r border-white/10">
                {/* Background Gradient - Grayscale */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black z-0"></div>

                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

                <div className="relative z-10 p-12 text-center max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" />
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

                {/* Floating Elements for Decoration - Grayscale */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            {/* Right Side - Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-black">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0 grayscale" />
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
