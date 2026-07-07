"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const tones = {
    green: "text-trust-green bg-trust-green/10 border-trust-green/30",
    blue: "text-trust-blue bg-trust-blue/10 border-trust-blue/30",
    amber: "text-trust-amber bg-trust-amber/10 border-trust-amber/30",
    red: "text-trust-red bg-trust-red/10 border-trust-red/30",
};

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    trend: string;
    tone?: keyof typeof tones;
}

export function StatCard({ icon, label, value, trend, tone = "green" }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-xl border border-navy-700/50 bg-navy-800/60 p-5 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg border ${tones[tone]}`}>{icon}</div>
        <span className="text-xs text-slate-400">{trend}</span>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-slate-400 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}