"use client";

import { 
  LayoutDashboard, 
  Network, 
  ShieldAlert, 
  Settings, 
  LogOut,
  Lock,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { useSession } from "../../hooks/useSession";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", href: "/", adminOnly: false },
  { icon: Network, label: "Dispositivos", href: "/devices", adminOnly: false },
  { icon: ShieldAlert, label: "Segurança", href: "/security", adminOnly: false },
  { icon: Users, label: "Usuários", href: "/users", adminOnly: true },
  { icon: Settings, label: "Configurações", href: "/settings", adminOnly: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, loading } = useSession();

  if (loading) {
    return (
      <aside className="w-64 h-screen bg-navy-900 border-r border-navy-700/50 flex flex-col fixed left-0 top-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-navy-700/50">
          <div className="w-6 h-6 border-2 border-trust-green/30 border-t-trust-green rounded-full animate-spin" />
        </div>
      </aside>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <aside className="w-64 h-screen bg-navy-900 border-r border-navy-700/50 flex flex-col fixed left-0 top-0 z-40">
      <div className="h-16 flex items-center px-6 border-b border-navy-700/50">
        <Lock className="w-6 h-6 text-trust-green mr-2" />
        <span className="text-lg font-bold text-slate-100 tracking-tight">
          Net<span className="text-trust-green">Guard</span>
        </span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-trust-green/10 text-trust-green border border-trust-green/20"
                    : "text-slate-400 hover:text-slate-100 hover:bg-navy-800"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
      </nav>

      <div className="p-4 border-t border-navy-700/50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-800/50 border border-navy-700/50">
          <div className="w-2 h-2 rounded-full bg-trust-green animate-pulse-soft" />
          <span className="text-xs font-medium text-slate-300">Sistema Protegido</span>
        </div>
      </div>
    </aside>
  );
}