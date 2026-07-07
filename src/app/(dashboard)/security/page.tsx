"use client";

import { SecureCard } from "../../../components/ui/SecureCard";
import { Shield, AlertTriangle, ShieldCheck, Lock, Eye, Ban } from "lucide-react";

const securityEvents = [
  { id: 1, type: "blocked", message: "Tentativa de acesso não autorizado bloqueada", ip: "203.0.113.42", time: "2min atrás", severity: "high" },
  { id: 2, type: "warning", message: "Múltiplas falhas de login detectadas", ip: "198.51.100.23", time: "15min atrás", severity: "medium" },
  { id: 3, type: "info", message: "Certificado SSL renovado com sucesso", ip: "-", time: "1h atrás", severity: "low" },
  { id: 4, type: "blocked", message: "Port scan detectado e bloqueado", ip: "192.0.2.100", time: "2h atrás", severity: "high" },
  { id: 5, type: "warning", message: "Tráfego anômalo detectado na porta 443", ip: "10.0.0.55", time: "3h atrás", severity: "medium" },
];

const severityColors = {
  high: "text-trust-red bg-trust-red/10 border-trust-red/30",
  medium: "text-trust-amber bg-trust-amber/10 border-trust-amber/30",
  low: "text-trust-blue bg-trust-blue/10 border-trust-blue/30",
};

const typeIcons = {
  blocked: Ban,
  warning: AlertTriangle,
  info: Eye,
};

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Central de Segurança</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitoramento de ameaças e eventos de segurança em tempo real
        </p>
      </div>

      {/* sec status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-green/10 border border-trust-green/30">
              <ShieldCheck className="w-5 h-5 text-trust-green" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">1,247</div>
              <div className="text-xs text-slate-400">Ameaças Bloqueadas</div>
            </div>
          </div>
        </SecureCard>

        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-amber/10 border border-trust-amber/30">
              <AlertTriangle className="w-5 h-5 text-trust-amber" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">3</div>
              <div className="text-xs text-slate-400">Alertas Ativos</div>
            </div>
          </div>
        </SecureCard>

        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-red/10 border border-trust-red/30">
              <Ban className="w-5 h-5 text-trust-red" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">89</div>
              <div className="text-xs text-slate-400">IPs Banidos</div>
            </div>
          </div>
        </SecureCard>

        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-blue/10 border border-trust-blue/30">
              <Lock className="w-5 h-5 text-trust-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">256-bit</div>
              <div className="text-xs text-slate-400">Criptografia</div>
            </div>
          </div>
        </SecureCard>
      </div>

      {/* events */}
      <SecureCard title="Eventos Recentes">
        <div className="space-y-3">
          {securityEvents.map((event) => {
            const Icon = typeIcons[event.type as keyof typeof typeIcons];
            return (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-navy-900/50 border border-navy-700/30 hover:border-navy-600/50 transition-colors"
              >
                <div className={`p-2 rounded-lg border ${severityColors[event.severity as keyof typeof severityColors]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-200 mb-1">{event.message}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="font-mono-secure">{event.ip}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${severityColors[event.severity as keyof typeof severityColors]}`}>
                  {event.severity.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </SecureCard>
    </div>
  );
}