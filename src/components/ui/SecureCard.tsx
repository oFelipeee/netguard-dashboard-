"use-Client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { ReactNode } from "react";

interface SecureCardProps {
    childer: ReactNode;
    title?: string;
    secured?: boolean;
    className?: string;
}

export function SecureCard({ childer, title, secured = true, className }: SecureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-xl border border-navy-700/50 bg-navy-800/60 
                  backdrop-blur-sm shadow-lg shadow-black/20 overflow-hidden ${className}`}>
                    
                  </motion.div>


            );
        }