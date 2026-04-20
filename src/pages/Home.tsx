import { useAuthStore } from "../store/auth";
import { BookOpen, Video } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  const { user } = useAuthStore();
  const firstName = user?.firstName || 'Estudiante';

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] min-h-[500px] rounded-2xl overflow-hidden shadow-2xl flex items-center animate-in fade-in duration-700">
      {/* 
        El fondo utiliza un fallback de ola digital azul desde Unsplash 
        Para usar la imagen de ondas de puntos (partículas) que solicitaste, 
        por favor arrastra tu imagen a la carpeta 'public' en el explorador de archivos y nómbrala 'bg-wave.png'
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/bg-wave.png'), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')` }}
      />
      {/* Overlay de gradiente para hacer que el texto resalte correctamente y mantener el estilo neón azul */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent z-10" />

      <div className="relative z-20 w-full max-w-4xl p-8 md:p-14">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          Campus Virtual Activo
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
          Bienvenido a tu <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Campus Virtual
          </span>, {firstName}
        </h1>
        
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10 drop-shadow-md leading-relaxed">
          Te invitamos a revisar tus cursos, interactuar con las herramientas disponibles y unirte a tus sesiones. Todo tu ecosistema educativo en un solo lugar.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link 
            to="/virtual-room" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_25px_rgba(37,99,235,0.6)] flex items-center gap-3 group"
          >
            <Video size={22} className="group-hover:scale-110 transition-transform" />
            Accede a tu sala virtual
          </Link>
          
          <Link 
            to="/courses" 
            className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-md border border-white/10 text-white rounded-xl font-medium transition-all flex items-center gap-3"
          >
            <BookOpen size={22} />
            Explorar mis cursos
          </Link>
        </div>
      </div>
    </div>
  );
}
