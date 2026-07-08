"use client";

import { SecureCard } from "../../components/ui/SecureCard";
import {AuditTrail} from "../../components/dashboard/AuditTrail";
import { StatCard } from "../../components/dashboard/StatCard";
import { TrafficChart } from "../../components/dashboard/TrafficChart";
import { DeviceList } from "../../components/dashboard/DeviceList";
import { useNetworkMetrics } from "../../hooks/useNetworkMetrics";
import { useState, useEffect } from "react";
import { Shield, Wifi, AlertTriangle, Activity, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const metrics = useNetworkMetrics();
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

const formatTime = (date: Date) => {
  if (!mounted) return "--:--:--";
  return date.toLocaleTimeString("pt-BR", { hour12: false });
};

  return (
    <div className="space-y-6">
      {/* Header com selo de segurança */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-trust-green" />
            Centro de Operações de Rede
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitoramento em tempo real · Conexão criptografada
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Timestamp da última sincronização */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Última sincronização: {formatTime(metrics.lastSync)}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-trust-green/10 border border-trust-green/30">
            <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" />
            <span className="text-xs font-medium text-trust-green">SISTEMA SEGURO</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Wifi className="w-5 h-5" />}
          label="Dispositivos Online"
          value={metrics.devicesOnline.toString()}
          trend="+3"
          tone="green"
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          label="Tráfego (Mbps)"
          value={metrics.traffic.toString()}
          trend="+12%"
          tone="blue"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Alertas Ativos"
          value={metrics.alerts.toString()}
          trend="-1"
          tone="amber"
        />
        <StatCard
          icon={<Shield className="w-5 h-5" />}
          label="Ameaças Bloqueadas"
          value={`${(metrics.threatsBlocked / 1000).toFixed(1)}k`}
          trend="24h"
          tone="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SecureCard title="Tráfego de Rede" className="lg:col-span-2">
          <TrafficChart />
        </SecureCard>
        <SecureCard title="Dispositivos Críticos">
          <DeviceList />
        </SecureCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SecureCard title="Status do Firewall">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Regras Ativas</span>
              <span className="text-sm font-semibold text-slate-200">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Conexões Bloqueadas</span>
              <span className="text-sm font-semibold text-trust-green">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Última Atualização</span>
              <span className="text-sm font-mono-secure text-slate-200">
                {formatTime(metrics.lastSync)}
              </span>
            </div>
          </div>
        </SecureCard>

        <SecureCard title="Últimos Eventos">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-trust-green" />
              <span className="text-slate-300">Firewall atualizado com sucesso</span>
              <span className="text-slate-500 text-xs ml-auto">2min atrás</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-trust-amber" />
              <span className="text-slate-300">Tentativa de acesso bloqueada</span>
              <span className="text-slate-500 text-xs ml-auto">15min atrás</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-trust-blue" />
              <span className="text-slate-300">Novo dispositivo conectado</span>
              <span className="text-slate-500 text-xs ml-auto">1h atrás</span>
            </div>
          </div>
        </SecureCard>
      </div>
      <AuditTrail />
    </div>
  );
}