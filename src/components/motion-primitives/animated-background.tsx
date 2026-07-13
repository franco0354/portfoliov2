'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'gradient' | 'particles' | 'geometric' | 'wave' | 'all';
  // // intensity?: 'subtle' | 'medium' | 'intense';
  // color?: string;
}

export function AnimatedBackground({
  className,
  variant = 'all',
  // intensity = 'medium',
  // color = 'primary'
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (variant !== 'particles' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant]);

  // const intensityClasses = {
  //   subtle: 'opacity-20',
  //   medium: 'opacity-40',
  //   intense: 'opacity-60'
  // };

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-0', className)}>
      {/* Animated Gradient Background */}
      {(variant === 'gradient' || variant === 'all') && (
        <motion.div
         
          animate={{
            background: [
              'linear-gradient(45deg, #f0f9ff, #e0e7ff, #f3e8ff)',
              'linear-gradient(45deg, #e0e7ff, #f3e8ff, #f0f9ff)',
              'linear-gradient(45deg, #f3e8ff, #f0f9ff, #e0e7ff)',
              'linear-gradient(45deg, #f0f9ff, #e0e7ff, #f3e8ff)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}

      {/* Geometric Shapes */}
      {(variant === 'geometric' || variant === 'all') && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-200 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br"
            animate={{
              rotate: -360,
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-32 left-32 w-20 h-20 border border-indigo-300 transform rotate-45"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>
      )}

      {/* Wave Effect */}
      {(variant === 'wave' || variant === 'all') && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100/30 to-transparent"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-100/20 to-transparent"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </div>
      )}

      {/* Canvas for Particles */}
      {variant === 'particles' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Floating Orbs */}
      {(variant === 'all') && (
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Grid Overlay */}
      {(variant === 'all') && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      )}
    </div>
  );
} 