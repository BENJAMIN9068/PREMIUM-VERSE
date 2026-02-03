import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();

        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.2 + 0.05,
            opacity: Math.random()
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        window.addEventListener('resize', setSize);

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black">
            {/* Deep Space Gradient Base */}
            <div className="absolute inset-0 bg-space-gradient opacity-60"></div>

            {/* Canvas Stars */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

            {/* Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            {/* Overlay Grid/Texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default SpaceBackground;
