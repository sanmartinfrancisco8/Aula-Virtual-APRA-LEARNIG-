import { Save } from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Configuración del Sistema
            <div className="h-px flex-1 min-w-[50px] bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">Preferencias y ajustes de APRA Learning Systems</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-500 flex items-center gap-2">
          <Save size={18} /> Guardar Cambios
        </button>
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-8">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[100px] pointer-events-none" />

        <section>
          <h2 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-2">Información Institucional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nombre de la Institución</label>
              <input type="text" defaultValue="APRA Learning Systems" className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-2 text-gray-200 focus:border-blue-500 outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Dominio Principal</label>
              <input type="text" defaultValue="apra.edu.com" className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-2 text-gray-200 focus:border-blue-500 outline-none transition-colors" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-2">Preferencias de Interfaz</h2>
          <div className="space-y-4 relative z-10">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-black/30 text-blue-500 focus:outline-none" />
              <span className="text-sm text-gray-300">Activar animaciones globales (Glassmorphism y degradados)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-black/30 text-blue-500 focus:outline-none" />
              <span className="text-sm text-gray-300">Notificaciones por correo electrónico a usuarios inactivos</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
