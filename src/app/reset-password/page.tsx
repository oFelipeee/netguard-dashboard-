"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token inválido ou ausente");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Token inválido");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success("Senha atualizada com sucesso!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Erro ao resetar senha");
      }
    } catch (error) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-trust-red/30 bg-navy-900/80 backdrop-blur-sm shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-red/10 border border-trust-red/30 mb-4">
              <AlertCircle className="w-8 h-8 text-trust-red" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Link Inválido</h1>
            <p className="text-sm text-slate-400 mb-6">
              O link de recuperação é inválido ou expirou.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-trust-amber hover:underline"
            >
              Solicitar novo link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-trust-green/30 bg-navy-900/80 backdrop-blur-sm shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green/10 border border-trust-green/30 mb-4">
              <CheckCircle className="w-8 h-8 text-trust-green" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Senha Atualizada!</h1>
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green/10 border border-trust-green/30 mb-4">
              <Shield className="w-8 h-8 text-trust-green" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Nova Senha</h1>
            <p className="text-sm text-slate-400 mt-1">
              Defina sua nova senha
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
                Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/20 transition-all"
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
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-trust-green hover:bg-trust-green/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Atualizar Senha
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-navy-800/30 border-t border-navy-700/50 text-center">
            <Link
              href="/login"
              className="text-sm text-trust-green hover:underline"
            >
              Voltar para o login
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-3 h-3" />
          <span>Conexão segura e criptografada</span>
        </div>
      </div>
    </div>
  );
}