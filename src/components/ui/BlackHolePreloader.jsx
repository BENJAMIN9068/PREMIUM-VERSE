import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const BlackHolePreloader = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const [phase, setPhase] = useState('sucking'); // sucking -> flash -> complete

    // Constants
    const PARTICLE_COUNT = 300;
    const SUCK_DURATION = 2500; // 2.5 seconds pull into black hole
    const FLASH_DURATION = 600; // Bright flash

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let lastTime = 0;

        // Resize handling
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener('resize', setSize);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Particle initialization - scattered around edges
        let particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Start from edges of screen
            const angle = Math.random() * Math.PI * 2;
            const distance = 400 + Math.random() * 400; // Start far from center
            particles.push({
                x: cx + Math.cos(angle) * distance,
                y: cy + Math.sin(angle) * distance,
                size: Math.random() * 3 + 1,
                speed: (Math.random() * 2 + 1) * 60, // Normalize speed for delta time
                angle: angle,
                // Grayscale colors: varying shades of white/grey
                color: Math.random() > 0.5 ? '#ffffff' : '#a0a0a0',
                trail: []
            });
        }

        // Black hole properties
        let blackHoleRadius = 5;
        let glowIntensity = 0;

        let startTime = Date.now();

        const animate = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;
            // Cap delta time to prevent huge jumps if tab is inactive
            const dt = Math.min(deltaTime, 0.1);
            // Multiplier to normalize speed (assuming ~60fps baseline)
            const moveFactor = dt * 60;

            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / SUCK_DURATION, 1);

            // Clear with fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw black hole glow (grows over time)
            glowIntensity = progress * 0.8;
            const glowRadius = 50 + progress * 100;

            // Outer glow - Monochrome gradient
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${glowIntensity * 0.3})`);
            gradient.addColorStop(0.5, `rgba(100, 100, 100, ${glowIntensity * 0.1})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw event horizon (black center)
            blackHoleRadius = 5 + progress * 40;
            ctx.beginPath();
            ctx.arc(cx, cy, blackHoleRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            // Subtle white ring for definition
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + progress * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Accretion disk effect - White/Gray rings
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(elapsed * 0.002);
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = blackHoleRadius + 15 + ring * 20;
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - ring * 0.05})`;
                ctx.lineWidth = 2 - ring * 0.5;
                ctx.stroke();
            }
            ctx.restore();

            // Update and draw particles
            particles.forEach((p, index) => {
                // Calculate distance to center
                const dx = cx - p.x;
                const dy = cy - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Spiral pull towards center (increases with progress)
                const pullStrength = 0.02 + progress * 0.15;
                const spiralOffset = 0.3; // Adds spiral motion

                // Move towards center with spiral using delta time
                p.x += (dx * pullStrength + dy * spiralOffset * 0.01) * moveFactor;
                p.y += (dy * pullStrength - dx * spiralOffset * 0.01) * moveFactor;

                // Store trail points
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 10) p.trail.shift();

                // Draw trail
                if (p.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.trail[0].x, p.trail[0].y);
                    for (let j = 1; j < p.trail.length; j++) {
                        ctx.lineTo(p.trail[j].x, p.trail[j].y);
                    }
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 500)})`;
                    ctx.lineWidth = p.size * 0.5;
                    ctx.stroke();
                }

                // Draw particle (if not absorbed)
                if (distance > blackHoleRadius) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 5;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Reset particle if absorbed
                if (distance < blackHoleRadius + 5) {
                    const newAngle = Math.random() * Math.PI * 2;
                    const newDistance = 400 + Math.random() * 300;
                    p.x = cx + Math.cos(newAngle) * newDistance;
                    p.y = cy + Math.sin(newAngle) * newDistance;
                    p.trail = [];
                }
            });

            // Draw center logo text
            ctx.save();
            ctx.font = 'bold 24px Inter, sans-serif';
            ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(elapsed * 0.01) * 0.2})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.fillText('PREMIUM VERSE', cx, cy);
            ctx.restore();

            // Check timing
            if (elapsed < SUCK_DURATION) {
                requestRef.current = requestAnimationFrame(animate);
            } else {
                setPhase('flash');
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        if (phase === 'flash') {
            const timer = setTimeout(() => {
                onComplete();
            }, FLASH_DURATION);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* White Flash Overlay - Monochrome */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={phase === 'flash' ? {
                    opacity: [0, 1, 1, 0],
                    background: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']
                } : {}}
                transition={{ duration: 0.6, times: [0, 0.2, 0.6, 1] }}
            />
        </motion.div>
    );
};

export default BlackHolePreloader;
