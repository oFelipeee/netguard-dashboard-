"use-client";


import{ LayoutDashboard, 
  Network, 
  ShieldAlert, 
  Settings, 
  LogOut,
  Lock
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils"; 

const menuItems = [
    {icon: LayoutDashboard, label: "Visão Geral", href: "/"},
    {icon: Network, label: "Dispositivos", href: "/devices"},
    {icon: ShieldAlert, label: "Segurança", href: "/security"},
    {icon: Settings, label: "Configurações", href: "/settings"},
];

export function Sidebar() {
    const pathname = usePathname();

    return (
         <aside className="w-64 h-screen bg-navy-900 border-r border-navy-700/50 flex flex-col fixed left-0 top-0 z-40">
            <div className="h-16 flex items-center px-6 border-b border-navy-700/50">
            <Lock className="w-6 h-6 text-trust-green mr-2" />
            </div>
         </aside>
        