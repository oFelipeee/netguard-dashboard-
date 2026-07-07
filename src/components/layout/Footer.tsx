import { Shield, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-700/50 bg-navy-900/50 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-trust-green" />
          <span>
            NetGuard Dashboard · Protegido por criptografia AES-256
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Sessão segura
          </span>
          <span>·</span>
          <span>v1.0.0</span>
          <span>·</span>
          <span>© 2026 NetGuard</span>
        </div>
      </div>
    </footer>
  );
}