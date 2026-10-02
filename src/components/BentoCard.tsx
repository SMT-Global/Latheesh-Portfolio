"use client";

import { motion } from "framer-motion";

export const BentoCard = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`bento-card p-6 md:p-8 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};
