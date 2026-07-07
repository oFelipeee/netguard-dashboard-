"use client";

import { SecureCard } from "../../../components/ui/SecureCard";
import { Monitor, Server, Router, Wifi, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

const statusColors = {
  online: "bg-trust-green",
  warning: "bg-trust-amber",
  offline: "bg-trust-red",
};

const typeIcons = {
  router: Router,
  server: Server,
  switch: Monitor,
  ap: Wifi,
};

export default function DevicesPage() {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api/devices");
        if (response.ok) {
          const data = await response.json();
          setDevices(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dispositivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-trust-green/30 border-t-trust-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Dispositivos de Rede</h1>
        <p className="text-slate-400 text-sm mt-1">
          Gerenciamento e monitoramento de todos os dispositivos conectados
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-green/10 border border-trust-green/30">
              <Monitor className="w-5 h-5 text-trust-green" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">
                {devices.filter((d) => d.status === "online").length}
              </div>
              <div className="text-xs text-slate-400">Online</div>
            </div>
          </div>
        </SecureCard>

        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-amber/10 border border-trust-amber/30">
              <Monitor className="w-5 h-5 text-trust-amber" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">
                {devices.filter((d) => d.status === "warning").length}
              </div>
              <div className="text-xs text-slate-400">Alertas</div>
            </div>
          </div>
        </SecureCard>

        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-red/10 border border-trust-red/30">
              <Monitor className="w-5 h-5 text-trust-red" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">
                {devices.filter((d) => d.status === "offline").length}
              </div>
              <div className="text-xs text-slate-400">Offline</div>
            </div>
          </div>
        </SecureCard>
      </div>

      {/* Lista de Dispositivos */}
      <SecureCard title="Todos os Dispositivos">
        {/* Busca */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou IP..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-900/50 border border-navy-700/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50"
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-navy-800 border border-navy-700/50 text-slate-300 hover:bg-navy-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700/50">
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">Dispositivo</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">IP</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">Tipo</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">Status</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">Uptime</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-2">Localização</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => {
                const Icon = typeIcons[device.type as keyof typeof typeIcons];
                return (
                  <tr
                    key={device.id}
                    className="border-b border-navy-700/30 hover:bg-navy-800/30 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-navy-800 border border-navy-700/50">
                          <Icon className="w-4 h-4 text-slate-300" />
                        </div>
                        <span className="text-sm font-medium text-slate-200">{device.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm font-mono-secure text-slate-300">{device.ip}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-xs text-slate-400 capitalize">{device.type}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusColors[device.status as keyof typeof statusColors]}`} />
                        <span className="text-xs text-slate-300 capitalize">{device.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-slate-400">{device.uptime}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-slate-400">{device.location}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SecureCard>
    </div>
  );
}