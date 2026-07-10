"use client";

import { useState } from "react";
import { Shield, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugLink, setDebugLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setDebugLink(data.debugLink || "");
        toast.success("Instruções enviadas para seu email!");
      } else {
        setError(data.error || "Erro ao processar solicitação");
      }
    } catch (error) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-navy-700/50 bg-navy-900/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
          {/* header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-navy-700/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-amber/10 border border-trust-amber/30 mb-4">
              <Shield className="w-8 h-8 text-trust-amber" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Recuperar Senha</h1>
            <p className="text-sm text-slate-400 mt-1">
              Enviamos um link para seu email
            </p>
          </div>

          {!success ? (
            <>
              {/* forms */}
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-trust-red/10 border border-trust-red/30 text-trust-red text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="p-4 rounded-lg bg-trust-blue/5 border border-trust-blue/20">
                  <p className="text-sm text-slate-300">
                    Digite seu email cadastrado e enviaremos um link para redefinir sua senha.
                  </p>
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
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-navy-800/50 border border-navy-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-trust-amber/50 focus:ring-1 focus:ring-trust-amber/20 transition-all"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-trust-amber hover:bg-trust-amber/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Enviar Link de Recuperação
                    </>
                  )}
                </button>
              </form>

              {/* footer */}
              <div className="px-8 py-4 bg-navy-800/30 border-t border-navy-700/50 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para o login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* mensagem success */}
              <div className="px-8 py-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green/10 border border-trust-green/30">
                  <CheckCircle className="w-8 h-8 text-trust-green" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 mb-2">
                    Email Enviado!
                  </h2>
                  <p className="text-sm text-slate-400">
                    Enviamos um link de recuperação para{" "}
                    <span className="text-slate-200 font-medium">{email}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Verifique sua caixa de entrada e spam
                  </p>
                </div>

                {/* Link de debug (só em desenvolvimento) */}
                {debugLink && (
                  <div className="p-3 rounded-lg bg-trust-amber/10 border border-trust-amber/30 text-left">
                    <p className="text-xs text-trust-amber mb-2 font-medium">
                      🔧 Link de debug (apenas desenvolvimento):
                    </p>
                    <a
                      href={debugLink}
                      className="text-xs text-trust-amber hover:underline break-all"
                    >
                      {debugLink}
                    </a>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                    setDebugLink("");
                  }}
                  className="w-full py-3 rounded-lg bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-200 font-medium transition-all"
                >
                  Enviar Novamente
                </button>
              </div>

              {/* footer */}
              <div className="px-8 py-4 bg-navy-800/30 border-t border-navy-700/50 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para o login
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-3 h-3" />
          <span>Conexão segura e criptografada</span>
        </div>
      </div>
    </div>
  );
}