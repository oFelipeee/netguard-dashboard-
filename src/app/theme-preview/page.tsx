export default function ThemePreview() {
  return (
    <div className="min-h-screen p-8 space-y-8">
      <h1 className="text-3xl font-bold">🎨 Preview do Tema</h1>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-300">Paleta Navy (fundos)</h2>
        <div className="flex gap-2">
          {[950, 900, 800, 700, 600].map((tone) => (
            <div
              key={tone}
              className={`w-24 h-24 rounded-lg bg-navy-${tone} flex items-center justify-center text-xs font-mono border border-navy-700`}
            >
              {tone}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-300">Cores de Status (Trust)</h2>
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-lg bg-trust-green/10 border border-trust-green/30 text-trust-green font-medium">
            ✅ Protegido
          </div>
          <div className="px-4 py-2 rounded-lg bg-trust-amber/10 border border-trust-amber/30 text-trust-amber font-medium">
            ⚠️ Alerta
          </div>
          <div className="px-4 py-2 rounded-lg bg-trust-red/10 border border-trust-red/30 text-trust-red font-medium">
            ❌ Crítico
          </div>
          <div className="px-4 py-2 rounded-lg bg-trust-blue/10 border border-trust-blue/30 text-trust-blue font-medium">
            ℹ️ Info
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-300">Card de Exemplo</h2>
        <div className="max-w-md rounded-xl border border-navy-700/50 bg-navy-800/60 backdrop-blur-sm p-6 shadow-secure">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-100">Firewall Ativo</h3>
            <span className="flex items-center gap-1.5 text-xs text-trust-green">
              <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse-soft" />
              ONLINE
            </span>
          </div>
          <p className="text-sm text-slate-400">
            1.247 ameaças bloqueadas nas últimas 24h
          </p>
        </div>
      </section>
    </div>
  );
}