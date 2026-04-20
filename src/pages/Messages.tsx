import { MessageSquare } from "lucide-react";

export function Messages() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Mensajes
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">Comunícate directamente con tus docentes y compañeros de clase</p>
        </div>
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <div className="text-center py-12 text-gray-400">
          <MessageSquare size={48} className="mx-auto mb-4 text-blue-500/50" />
          <p>Módulo de mensajería interna en construcción</p>
        </div>
      </div>
    </div>
  );
}
