"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { ReactNode } from "react";

interface SecureCardProps {
  children: ReactNode;
  title?: string;
  secured?: boolean;
  className?: string;
}

export function SecureCard({ children, title, secured = true, className = "" }: SecureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl border border-navy-700/50 bg-navy-800/60 
                  backdrop-blur-sm shadow-lg shadow-black/20 overflow-hidden ${className}`}
    >
      {secured && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-trust-green/80">
          <Shield className="w-3 h-3" />
          <span className="font-medium">PROTEGIDO</span>
        </div>
      )}
      {title && (
        <div className="px-5 py-3 border-b border-navy-700/50">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </motion.div>
  );
}