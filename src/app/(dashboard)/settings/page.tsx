"use client";

import { SecureCard } from "../../../components/ui/SecureCard";
import { User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Configurações</h1>
        <p className="text-slate-400 text-sm mt-1">
          Gerencie as configurações do sistema e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perfil */}
        <SecureCard title="Perfil do Usuário">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Nome
              </label>
              <input
                type="text"
                defaultValue="Admin"
                className="w-full px-4 py-2 rounded-lg bg-navy-900/50 border border-navy-700/50 text-slate-200 focus:outline-none focus:border-trust-green/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@netguard.io"
                className="w-full px-4 py-2 rounded-lg bg-navy-900/50 border border-navy-700/50 text-slate-200 focus:outline-none focus:border-trust-green/50"
              />
            </div>
            <button className="px-4 py-2 rounded-lg bg-trust-green hover:bg-trust-green/90 text-white font-medium transition-colors">
              Salvar Alterações
            </button>
          </div>
        </SecureCard>

        {/* Notificações */}
        <SecureCard title="Notificações">
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 cursor-pointer hover:border-navy-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-200">Alertas de Segurança</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-navy-700 bg-navy-800 text-trust-green focus:ring-trust-green/20" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 cursor-pointer hover:border-navy-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-200">Relatórios Diários</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-navy-700 bg-navy-800 text-trust-green focus:ring-trust-green/20" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 cursor-pointer hover:border-navy-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-200">Atualizações do Sistema</span>
              </div>
              <input type="checkbox" className="w-4 h-4 rounded border-navy-700 bg-navy-800 text-trust-green focus:ring-trust-green/20" />
            </label>
          </div>
        </SecureCard>

        {/* Segurança */}
        <SecureCard title="Segurança">
          <div className="space-y-3">
            <button className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-navy-700/30 text-slate-200 hover:border-trust-green/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-trust-green" />
                <span className="text-sm">Alterar Senha</span>
              </div>
              <span className="text-xs text-slate-500">→</span>
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-navy-700/30 text-slate-200 hover:border-trust-green/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-trust-amber" />
                <span className="text-sm">Autenticação 2FA</span>
              </div>
              <span className="text-xs text-trust-green">Ativado</span>
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-navy-700/30 text-slate-200 hover:border-trust-green/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-trust-blue" />
                <span className="text-sm">Sessões Ativas</span>
              </div>
              <span className="text-xs text-slate-500">2 dispositivos</span>
            </button>
          </div>
        </SecureCard>

        {/* Aparência */}
        <SecureCard title="Aparência">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30">
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-200">Tema</span>
              </div>
              <select className="px-3 py-1 rounded bg-navy-800 border border-navy-700/50 text-sm text-slate-200 focus:outline-none">
                <option>Escuro</option>
                <option>Claro</option>
                <option>Automático</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-900/50 border border-navy-700/30">
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-200">Idioma</span>
              </div>
              <select className="px-3 py-1 rounded bg-navy-800 border border-navy-700/50 text-sm text-slate-200 focus:outline-none">
                <option>Português</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
          </div>
        </SecureCard>
      </div>
    </div>
  );
}