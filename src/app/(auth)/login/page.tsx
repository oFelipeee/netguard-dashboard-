"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha inválidos");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-navy-700/50 bg-navy-900/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-navy-700/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green/10 border border-trust-green/30 mb-4">
              <Shield className="w-8 h-8 text-trust-green" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">NetGuard</h1>
            <p className="text-sm text-slate-400 mt-1">
              Centro de Operações de Rede
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-trust-red/10 border border-trust-red/30 text-trust-red text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/20 transition-all"
                placeholder="admin@netguard.io"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Link Esqueceu a senha */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-trust-amber hover:text-trust-amber/80 font-medium"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-trust-green hover:bg-trust-green/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Entrar no Sistema
                </>
              )}
            </button>
          </form>

          {/* Footer com link */}
          <div className="px-8 py-4 bg-navy-800/30 border-t border-navy-700/50 text-center">
            <p className="text-sm text-slate-400">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-trust-green hover:text-trust-green/80 font-medium">
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        {/* Selo de segurança embaixo */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3 h-3" />
          <span>Conexão criptografada · Acesso restrito</span>
        </div>
      </div>
    </div>
  );
}