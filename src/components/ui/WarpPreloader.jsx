import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const WarpPreloader = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const [flash, setFlash] = useState(false);

    // Constants
    const STAR_COUNT = 400;
    const WARP_DURATION = 3000; // 3 seconds warp
    const FLASH_DURATION = 500; // 0.5 seconds flash

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Resize handling
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener('resize', setSize);

        // Star initialization
        let stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * 2000, // Depth
            });
        }

        let startTime = Date.now();
        let speed = 2; // Initial speed

        const animate = () => {
            const elapsed = Date.now() - startTime;

            // Calculate speed based on time (Exponential acceleration)
            if (elapsed < WARP_DURATION) {
                const progress = elapsed / WARP_DURATION;
                speed = 2 + Math.pow(progress, 3) * 100; // Ramps up to 102
            }

            // Fill background with solid deep black (prevent grey trails)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach(star => {
                // Move star towards screen (decrease z)
                star.z -= speed;

                // Reset star if it passes camera
                if (star.z <= 0) {
                    star.z = 2000;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }

                // Project 3D coordinates to 2D
                const k = 128.0 / star.z;
                const px = star.x * k + cx;
                const py = star.y * k + cy;

                // Previous position for streak drawing
                const prevZ = star.z + speed * 2; // Look further back
                const prevK = 128.0 / prevZ;
                const prevPx = star.x * prevK + cx;
                const prevPy = star.y * prevK + cy;

                // Draw streak
                if (
                    px >= 0 && px <= canvas.width &&
                    py >= 0 && py <= canvas.height &&
                    star.z < 1800 // Don't draw if too far
                ) {
                    const alpha = (1 - star.z / 2000);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = Math.max(0.5, 3 * k); // Thicker as it gets closer
                    ctx.beginPath();
                    ctx.moveTo(prevPx, prevPy);
                    ctx.lineTo(px, py);
                    ctx.stroke();

                    // Add white glow for realism (no blue)
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = '#FFFFFF';
                }
            });

            // Check timing
            if (elapsed < WARP_DURATION) {
                requestRef.current = requestAnimationFrame(animate);
            } else {
                setFlash(true);
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        if (flash) {
            // Wait for flash duration then trigger completion
            const timer = setTimeout(() => {
                onComplete();
            }, FLASH_DURATION);
            return () => clearTimeout(timer);
        }
    }, [flash, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* White Flash Overlay */}
            <div className={clsx(
                "absolute inset-0 bg-white pointer-events-none transition-opacity duration-200 ease-in",
                flash ? "opacity-100" : "opacity-0"
            )}></div>
        </motion.div>
    );
};

export default WarpPreloader;
