"use client";

import { motion } from "framer-motion";

// Lightweight background component - plain white background
export const LightBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white" />
  );
};

// Lightweight floating bubbles - reduced count and simpler animation
export const LightFloatingBubbles = () => {
  const bubbles = [
    { size: 60, left: 10, top: 20, delay: 0 },
    { size: 80, left: 80, top: 60, delay: 1 },
    { size: 50, left: 30, top: 80, delay: 2 },
  ];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            background: `radial-gradient(circle, rgba(196, 5, 3, 0.03) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
};
