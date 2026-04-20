import { Users, BookOpen, GraduationCap, Clock, FileWarning, Award } from "lucide-react";
import { useAuthStore } from "../store/auth";

export function Dashboard() {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'STUDENT';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            {isStudent ? 'Mi Resumen Académico' : 'Resumen Académico'}
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">
             {isStudent ? 'Sigue tu progreso y actividades pendientes' : 'Monitorea el progreso de APRA Learning Systems'}
          </p>
        </div>
        {!isStudent && (
          <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(52,211,153,0.4)] border border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none">
            Crear Nuevo Curso
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isStudent ? (
          <>
            <KPICard title="Cursos Inscritos" value="4" icon={<BookOpen size={20} />} trend="Semestre 1" color="blue" />
            <KPICard title="Entregas Pendientes" value="2" icon={<FileWarning size={20} />} trend="Próxima mañana" color="red" />
            <KPICard title="Horas de Estudio" value="126" icon={<Clock size={20} />} trend="+12 este mes" color="green" />
            <KPICard title="Promedio General" value="92%" icon={<Award size={20} />} trend="Excelente" color="blue" />
          </>
        ) : (
          <>
            <KPICard title="Cursos Activos" value="24" icon={<BookOpen size={20} />} trend="+3 este mes" color="blue" />
            <KPICard title="Estudiantes" value="1,842" icon={<Users size={20} />} trend="+124 este mes" color="green" />
            <KPICard title="Docentes" value="86" icon={<GraduationCap size={20} />} trend="Estable" neutral color="red" />
            <KPICard title="Horas de Clase" value="4,200" icon={<Clock size={20} />} trend="+8% vs pasado" color="blue" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[100px] pointer-events-none group-hover:bg-blue-400/20 transition-colors duration-500" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-emerald-400/10 blur-[80px] pointer-events-none transition-colors duration-500" />
          
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center relative z-10">
            <span className="w-1.5 h-6 bg-emerald-400 rounded-full mr-3 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
            {isStudent ? 'Mis Cursos Recientes' : 'Cursos Recientes'}
          </h2>
          <div className="space-y-4 relative z-10">
            {isStudent ? (
              <>
                <CourseRow title="Arquitectura Cloud Enterprise" text_secondary="Prof. Andrea Gómez" progress={80} />
                <CourseRow title="Liderazgo y Gestión de Equipos" text_secondary="Prof. Jorge Martínez" progress={45} />
                <CourseRow title="Introducción a Machine Learning" text_secondary="Prof. Andrea Gómez" progress={15} />
              </>
            ) : (
              <>
                <CourseRow title="Arquitectura Cloud Enterprise" text_secondary="145 estudiantes inscritos" progress={80} />
                <CourseRow title="Liderazgo y Gestión de Equipos" text_secondary="89 estudiantes inscritos" progress={45} />
                <CourseRow title="Introducción a Machine Learning" text_secondary="210 estudiantes inscritos" progress={15} />
                <CourseRow title="Seguridad Informática Nivel 1" text_secondary="67 estudiantes inscritos" progress={98} />
              </>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 blur-[80px] pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-500" />
          
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center relative z-10">
             <span className="w-1.5 h-6 bg-blue-400 rounded-full mr-3 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></span>
            {isStudent ? 'Próximas Tareas' : 'Actividad Reciente'}
          </h2>
          <div className="space-y-6 relative z-10">
            {isStudent ? (
              <>
                <ActivityItem text="Examen de Cloud Computing" time="Mañana, 10:00 AM" active />
                <ActivityItem text="Entrega de Ensayo Liderazgo" time="Viernes, 23:59" />
                <ActivityItem text="Foro Semana 4 Machine Learning" time="Próximo Lunes" />
              </>
            ) : (
              <>
                <ActivityItem text="Juan Pérez entregó Tarea 1" time="Hace 5 min" active />
                <ActivityItem text="Nuevo archivo subido: 'Syllabus.pdf'" time="Hace 1 hora" />
                <ActivityItem text="Reunión de profesores programada" time="Hace 3 horas" />
                <ActivityItem text="Evaluación Módulo 2 activada" time="Ayer" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, neutral = false, color = "blue" }: any) {
  const colorMap: any = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", hover: "hover:border-blue-500/40", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]", grad: "group-hover:to-blue-600/5" },
    green: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20", hover: "hover:border-green-500/40", shadow: "shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]", grad: "group-hover:to-green-600/5" },
    red: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", hover: "hover:border-red-500/40", shadow: "shadow-[0_0_15px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]", grad: "group-hover:to-red-600/5" }
  };
  
  const c = colorMap[color];

  return (
    <div className={`bg-slate-950/40 backdrop-blur-md border border-white/10 ${c.hover} rounded-xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 group hover:-translate-y-1`}>
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${c.grad} transition-all duration-500 pointer-events-none`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 ${c.bg} ${c.text} rounded-lg border ${c.border} group-hover:scale-110 transition-transform ${c.shadow}`}>
          {icon}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-md border ${
          neutral 
            ? 'bg-gray-800/50 text-gray-400 border-gray-700/50' 
            : 'bg-green-900/20 text-green-400 border-green-800/30'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium relative z-10">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1 tracking-tight relative z-10">{value}</p>
    </div>
  );
}

function CourseRow({ title, text_secondary, progress }: { title: string, text_secondary: string, progress: number }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:border-emerald-500/40 hover:bg-black/40 transition-all group cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.1)] group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(96,165,250,0.4)] transition-all">
          <BookOpen size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{title}</h4>
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{text_secondary}</p>
        </div>
      </div>
      <div className="w-32 hidden sm:block">
        <div className="flex justify-between text-[11px] font-medium tracking-wide mb-1.5">
          <span className="text-gray-400 uppercase">Progreso</span>
          <span className="text-emerald-400">{progress}%</span>
        </div>
        <div className="w-full bg-black/50 rounded-full h-1.5 flex overflow-hidden border border-white/5">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.6)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time, active = false }: { text: string, time: string, active?: boolean }) {
  return (
    <div className="flex items-start space-x-4 relative before:absolute before:left-[11px] before:top-6 before:bottom-[-24px] before:w-px before:bg-white/10 last:before:hidden group">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 mt-0.5 transition-colors ${
        active 
          ? 'bg-black border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]' 
          : 'bg-black border-white/20 group-hover:border-blue-400/50'
      }`}>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-blue-400' : 'bg-white/20 group-hover:bg-blue-400/50'} transition-colors`}></div>
      </div>
      <div>
        <p className={`text-sm ${active ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-200'} transition-colors`}>{text}</p>
        <p className="text-xs text-emerald-400/80 mt-1">{time}</p>
      </div>
    </div>
  );
}
