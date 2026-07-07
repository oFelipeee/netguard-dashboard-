"use client";

import { Bell, Search, ShieldCheck, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function TopBar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: "/login",
      redirect: true 
    });
  };

  return (
    <header className="h-16 bg-navy-900/80 backdrop-blur-md border-b border-navy-700/50 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Busca */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar dispositivos, IPs ou logs..."
            className="w-full bg-navy-800/50 border border-navy-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/20 transition-all"
          />
        </div>
      </div>

      {/* Ações do Usuário */}
      <div className="flex items-center gap-4">
        {/* Selo de Segurança */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-trust-green/5 border border-trust-green/20">
          <ShieldCheck className="w-4 h-4 text-trust-green" />
          <span className="text-xs font-medium text-trust-green">Conexão Segura</span>
        </div>

        {/* Notificações */}
        <button className="relative p-2 text-slate-400 hover:text-slate-100 hover:bg-navy-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-trust-red rounded-full border-2 border-navy-900" />
        </button>

        {/* Perfil */}
        <div className="flex items-center gap-3 pl-4 border-l border-navy-700/50">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-200">
              {session?.user?.name || "Admin"}
            </div>
            <div className="text-xs text-slate-500">
              {session?.user?.email || "admin@netguard.io"}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-trust-green to-trust-blue flex items-center justify-center text-white font-bold text-sm">
            {session?.user?.name?.charAt(0) || "A"}
          </div>
          
          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-trust-red hover:bg-trust-red/10 rounded-lg transition-colors"
            title="Sair do sistema"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}