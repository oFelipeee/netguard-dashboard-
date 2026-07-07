"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, User, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações básicas
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    // 🔒 MOCK: Em produção, isso faria uma requisição pra API
    // Simulando registro bem-sucedido
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSuccess(true);
    setLoading(false);

    // Redireciona após 2 segundos
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-trust-green/30 bg-navy-900/80 backdrop-blur-sm shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green/10 border border-trust-green/30 mb-4">
              <CheckCircle className="w-8 h-8 text-trust-green" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Conta Criada!</h1>
            <p className="text-sm text-slate-400">
              Redirecionando para o login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-navy-700/50 bg-navy-900/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-navy-700/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-blue/10 border border-trust-blue/30 mb-4">
              <Shield className="w-8 h-8 text-trust-blue" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Criar Conta</h1>
            <p className="text-sm text-slate-400 mt-1">
              Junte-se ao NetGuard
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
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-blue/50 focus:ring-1 focus:ring-trust-blue/20 transition-all"
                  placeholder="João Silva"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-blue/50 focus:ring-1 focus:ring-trust-blue/20 transition-all"
                  placeholder="joao@empresa.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-blue/50 focus:ring-1 focus:ring-trust-blue/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-blue/50 focus:ring-1 focus:ring-trust-blue/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-trust-blue hover:bg-trust-blue/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          {/* Footer com link */}
          <div className="px-8 py-4 bg-navy-800/30 border-t border-navy-700/50 text-center">
            <p className="text-sm text-slate-400">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-trust-blue hover:text-trust-blue/80 font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}