"use client";

import { SecureCard } from "../ui/SecureCard";
import { User, Shield, Ban, LogIn, Settings } from "lucide-react";

const auditLogs = [
  {
    id: 1,
    user: "admin@netguard.io",
    action: "Bloqueou dispositivo",
    target: "Access Point (192.168.1.50)",
    time: "há 2 minutos",
    icon: Ban,
    severity: "high",
  },
  {
    id: 2,
    user: "admin@netguard.io",
    action: "Atualizou regras do firewall",
    target: "Firewall Principal",
    time: "há 15 minutos",
    icon: Shield,
    severity: "medium",
  },
  {
    id: 3,
    user: "admin@netguard.io",
    action: "Login realizado",
    target: "Sistema",
    time: "há 1 hora",
    icon: LogIn,
    severity: "low",
  },
  {
    id: 4,
    user: "admin@netguard.io",
    action: "Alterou configurações de notificação",
    target: "Perfil",
    time: "há 3 horas",
    icon: Settings,
    severity: "low",
  },
];

const severityColors = {
  high: "text-trust-red bg-trust-red/10 border-trust-red/30",
  medium: "text-trust-amber bg-trust-amber/10 border-trust-amber/30",
  low: "text-trust-blue bg-trust-blue/10 border-trust-blue/30",
};

export function AuditTrail() {
  return (
    <SecureCard title="Log de Auditoria" className="h-full">
      <div className="space-y-3">
        {auditLogs.map((log) => {
          const Icon = log.icon;
          return (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 hover:border-navy-600/50 transition-colors"
            >
              <div className={`p-2 rounded-lg border flex-shrink-0 ${severityColors[log.severity as keyof typeof severityColors]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-200">
                  <span className="font-medium">{log.action}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="text-slate-400">{log.target}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <User className="w-3 h-3" />
                  <span className="font-mono-secure">{log.user}</span>
                  <span>·</span>
                  <span>{log.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SecureCard>
  );
}