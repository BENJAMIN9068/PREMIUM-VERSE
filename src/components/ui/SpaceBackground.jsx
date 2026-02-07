import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let lastTime = 0;

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();

        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: (Math.random() * 0.2 + 0.05) * 60, // Normalize speed for delta time
            opacity: Math.random()
        }));

        const animate = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            // Cap delta time to prevent huge jumps if tab is inactive
            const dt = Math.min(deltaTime, 0.1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.y -= star.speed * dt;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        window.addEventListener('resize', setSize);

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black">
            {/* Deep Space Gradient Base - Grayscale */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111] to-black opacity-80"></div>

            {/* Canvas Stars */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

            {/* Ambient Glows - White/Gray only */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            {/* Overlay Grid/Texture - subtle white grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none grayscale"></div>
        </div>
    );
};

export default SpaceBackground;
