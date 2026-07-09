"use client";

import { SecureCard } from "../../../components/ui/SecureCard";
import { useSocket } from "../../../hooks/useSocket";
import { Monitor, Server, Router, Wifi, Search, Filter, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { io } from "socket.io-client"; 

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

type DeviceForm = {
  name: string;
  ip: string;
  type: "router" | "server" | "switch" | "ap";
  status: "online" | "warning" | "offline";
  uptime: string;
  location: string;
};

const initialFormState: DeviceForm = {
  name: "", ip: "", type: "server", status: "online", uptime: "0d 0h", location: ""
};

export default function DevicesPage() {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<DeviceForm>(initialFormState);

  const { isConnected } = useSocket();

  const fetchDevices = async () => {
    try {
      const res = await fetch("/api/devices");
      const data = await res.json();
      setDevices(data);
    } catch (error) {
      toast.error("Erro ao carregar dispositivos");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDevices();

    const socket = io({ path: "/api/socketio" });
    
    socket.on("devices-updated", (devices) => {
      setDevices(devices);
    });

    return () => {
      socket.off("devices-updated");
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/devices/${editingId}` : "/api/devices";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Dispositivo atualizado!" : "Dispositivo criado!");
        setShowForm(false);
        setEditingId(null);
        setFormData(initialFormState);
        fetchDevices();
        
        await fetch("/api/devices/notify", { method: "POST" });
      } else {
        toast.error("Erro ao salvar dispositivo");
      }
    } catch (error) {
      toast.error("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (device: any) => {
    setFormData(device);
    setEditingId(device.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este dispositivo?")) return;

    try {
      const res = await fetch(`/api/devices/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Dispositivo removido!");
        fetchDevices();
        
        await fetch("/api/devices/notify", { method: "POST" });
      }
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  };

  const filteredDevices = devices.filter(
    (d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.ip.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Dispositivos de Rede</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-trust-green' : 'bg-trust-red'} animate-pulse`} />
            <span className="text-xs text-slate-400">
              {isConnected ? "Tempo Real" : "Desconectado"}
            </span>
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditingId(null); setFormData(initialFormState); }}
            className="flex items-center gap-2 px-4 py-2 bg-trust-green hover:bg-trust-green/90 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo Dispositivo
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-green/10 border border-trust-green/30"><Monitor className="w-5 h-5 text-trust-green" /></div>
            <div><div className="text-2xl font-bold text-slate-100">{devices.filter(d => d.status === "online").length}</div><div className="text-xs text-slate-400">Online</div></div>
          </div>
        </SecureCard>
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-amber/10 border border-trust-amber/30"><Monitor className="w-5 h-5 text-trust-amber" /></div>
            <div><div className="text-2xl font-bold text-slate-100">{devices.filter(d => d.status === "warning").length}</div><div className="text-xs text-slate-400">Alertas</div></div>
          </div>
        </SecureCard>
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-red/10 border border-trust-red/30"><Monitor className="w-5 h-5 text-trust-red" /></div>
            <div><div className="text-2xl font-bold text-slate-100">{devices.filter(d => d.status === "offline").length}</div><div className="text-xs text-slate-400">Offline</div></div>
          </div>
        </SecureCard>
      </div>

      {/* forms */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-100">{editingId ? "Editar Dispositivo" : "Novo Dispositivo"}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nome</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">IP</label>
                  <input required type="text" value={formData.ip} onChange={e => setFormData({...formData, ip: e.target.value})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tipo</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white">
                    <option value="router">Router</option>
                    <option value="server">Server</option>
                    <option value="switch">Switch</option>
                    <option value="ap">Access Point</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white">
                    <option value="online">Online</option>
                    <option value="warning">Warning</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Uptime</label>
                  <input value={formData.uptime} onChange={e => setFormData({...formData, uptime: e.target.value})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Localização</label>
                  <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-300 hover:bg-navy-800 rounded">Cancelar</button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-trust-green text-white rounded hover:bg-trust-green/90">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* tabelinha */}
      <SecureCard title="Todos os Dispositivos">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-900/50 border border-navy-700/50 text-sm text-slate-200 focus:outline-none focus:border-trust-green/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700/50">
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Dispositivo</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">IP</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Tipo</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Status</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Localização</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase py-3 px-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => {
                const Icon = typeIcons[device.type as keyof typeof typeIcons];
                return (
                  <tr key={device.id} className="border-b border-navy-700/30 hover:bg-navy-800/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-navy-800 border border-navy-700/50"><Icon className="w-4 h-4 text-slate-300" /></div>
                        <span className="text-sm font-medium text-slate-200">{device.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm font-mono-secure text-slate-300">{device.ip}</td>
                    <td className="py-3 px-2 text-xs text-slate-400 capitalize">{device.type}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusColors[device.status as keyof typeof statusColors]}`} />
                        <span className="text-xs text-slate-300 capitalize">{device.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-slate-400">{device.location}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(device)} className="p-1.5 text-slate-400 hover:text-trust-blue hover:bg-trust-blue/10 rounded transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(device.id)} className="p-1.5 text-slate-400 hover:text-trust-red hover:bg-trust-red/10 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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