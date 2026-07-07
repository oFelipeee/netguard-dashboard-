"use client";

import { useState, useEffect } from "react";

export interface NetworkMetrics {
  devicesOnline: number;
  traffic: number;
  alerts: number;
  threatsBlocked: number;
  lastSync: Date;
}

export function useNetworkMetrics() {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    devicesOnline: 142,
    traffic: 847,
    alerts: 2,
    threatsBlocked: 1247,
    lastSync: new Date(),
  });

  useEffect(() => {
    // Simula atualização a cada 5 segundos
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        devicesOnline: prev.devicesOnline + Math.floor(Math.random() * 3) - 1,
        traffic: Math.max(0, prev.traffic + Math.floor(Math.random() * 100) - 50),
        alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3) - 1),
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 5),
        lastSync: new Date(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}