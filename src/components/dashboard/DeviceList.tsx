"use client";

import { Monitor, Server, Router, Wifi, ShieldBan } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "../ui/ConfirmModal";

const initialDevices = [
  { name: "Firewall Principal", ip: "192.168.1.1", type: "router", status: "online" },
  { name: "Servidor Web", ip: "192.168.1.10", type: "server", status: "online" },
  { name: "Switch Core", ip: "192.168.1.2", type: "switch", status: "online" },
  { name: "Access Point", ip: "192.168.1.50", type: "ap", status: "warning" },
];

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

export function DeviceList() {
  const [devices, setDevices] = useState(initialDevices);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleBlockClick = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setModalOpen(true);
  };

  const handleConfirmBlock = () => {
    // Remove o dispositivo da lista (simulação)
    setDevices((prev) => prev.filter((d) => d.name !== selectedDevice));
    
    // Mostra o toast de sucesso
    toast.success(`${selectedDevice} bloqueado com sucesso`, {
      description: "O tráfego deste dispositivo foi interrompido.",
      duration: 4000,
    });
  };

  return (
    <>
      <div className="space-y-3">
        {devices.map((device) => {
          const Icon = typeIcons[device.type as keyof typeof typeIcons];
          return (
            <div
              key={device.ip}
              className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 hover:border-navy-600/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-navy-800 border border-navy-700/50">
                  <Icon className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{device.name}</div>
                  <div className="text-xs font-mono-secure text-slate-500">{device.ip}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusColors[device.status as keyof typeof statusColors]}`} />
                  <span className="text-xs text-slate-400 capitalize">{device.status}</span>
                </div>
                
                {/* Botão de bloquear que aparece no hover */}
                <button
                  onClick={() => handleBlockClick(device.name)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-trust-red hover:bg-trust-red/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Bloquear dispositivo"
                >
                  <ShieldBan className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        
        {devices.length === 0 && (
          <div className="text-center py-6 text-slate-500 text-sm">
            Nenhum dispositivo ativo.
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmBlock}
        title="Bloquear Dispositivo"
        description={`Tem certeza que deseja bloquear o acesso de "${selectedDevice}"? Esta ação interromperá todas as conexões de rede deste dispositivo imediatamente.`}
        confirmText="Bloquear Acesso"
        danger
      />
    </>
  );
}