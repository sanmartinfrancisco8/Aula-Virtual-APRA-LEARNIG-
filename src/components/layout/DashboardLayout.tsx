import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  Award,
  Video,
  Megaphone,
  GraduationCap,
  MessageSquare,
  Home
} from "lucide-react";
import { cn } from "../../lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-950 via-teal-900 to-emerald-800 text-gray-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950/40 backdrop-blur-md border-r border-teal-900/40 flex flex-col transition-all duration-300 shrink-0 relative">
        {/* Multicolour Glow effect */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-400/10 via-emerald-400/10 to-transparent blur-[60px] pointer-events-none" />
        
        <div className="h-16 flex items-center px-4 border-b border-white/5 relative z-10 w-full overflow-hidden">
          <div className="w-8 h-8 rounded shrink-0 bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(52,211,153,0.4)] mr-2.5">
            A
          </div>
          <span className="font-semibold text-sm truncate tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-emerald-300">
            APRA Learning Systems
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto relative z-10">
          <NavItem to="/" icon={<Home size={20} />} label="Home" active={location.pathname === "/"} />
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === "/dashboard"} />
          <NavItem to="/courses" icon={<BookOpen size={20} />} label="Cursos" active={location.pathname === "/courses"} />
          <NavItem to="/syllabus" icon={<GraduationCap size={20} />} label="Programa del Curso" active={location.pathname === "/syllabus"} />
          <NavItem to="/grades" icon={<Award size={20} />} label="Calificaciones" active={location.pathname === "/grades"} />
          <NavItem to="/virtual-room" icon={<Video size={20} />} label="Sala Virtual" active={location.pathname === "/virtual-room"} />
          <NavItem to="/announcements" icon={<Megaphone size={20} />} label="Anuncios" active={location.pathname === "/announcements"} />
          <NavItem to="/messages" icon={<MessageSquare size={20} />} label="Mensajes" active={location.pathname === "/messages"} />
          
          {(user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN') && (
            <NavItem to="/users" icon={<Users size={20} />} label="Usuarios" active={location.pathname === "/users"} />
          )}

          <NavItem to="/files" icon={<FolderOpen size={20} />} label="Archivos" active={location.pathname === "/files"} />
          
          {(user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN') && (
            <div className="pt-6 mt-6 border-t border-white/5">
              <NavItem to="/settings" icon={<Settings size={20} />} label="Configuración" active={location.pathname === "/settings"} />
            </div>
          )}
        </nav>
        
        <div className="p-4 border-t border-white/5 flex items-center space-x-3 cursor-pointer hover:bg-white/10 rounded-md mx-2 mb-2 transition-colors relative z-10">
          <div className="w-10 h-10 rounded-full bg-blue-950 border border-blue-800/50 flex items-center justify-center text-sm font-semibold text-blue-200 shrink-0">
            {user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-200 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-[11px] text-blue-400 truncate">
              {user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN' ? 'Administrador' : user?.role === 'TEACHER' ? 'Docente' : 'Estudiante'}
            </p>
          </div>
          <button onClick={handleLogout} title="Cerrar sesión" className="p-1.5 hover:bg-red-500/20 rounded-md group transition-colors relative flex items-center justify-center">
            <LogOut size={16} className="text-gray-500 group-hover:text-red-400 shrink-0 transition-colors" />
            <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-900 border border-white/10 text-[11px] font-medium text-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              Salir
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Content Background Glows */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
        
        {/* HEADER */}
        <header className="h-16 border-b border-teal-900/40 bg-slate-950/40 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Home</span>
            <ChevronRight size={14} className="mx-2 text-gray-600" />
            <span className="text-gray-200 font-medium tracking-wide">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Buscar recursos..." 
                className="pl-9 pr-4 py-2 w-64 bg-black/20 border border-white/10 rounded-md text-sm text-gray-200 placeholder:text-gray-500 focus:bg-black/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* SCROLLABLE VIEW */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, to, active = false }: { icon: React.ReactNode, label: string, to: string, active?: boolean }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
        active 
          ? "bg-gradient-to-r from-emerald-500/20 to-transparent border-l-2 border-emerald-400 text-emerald-50" 
          : "text-gray-300 hover:bg-black/20 hover:text-white border-l-2 border-transparent"
      )}
    >
      <span className={cn(active ? "text-emerald-400" : "text-gray-400")}>{icon}</span>
      <span>{label}</span>
      {active && (
        <div className="absolute right-0 w-8 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none rounded-r-md" />
      )}
    </Link>
  );
}
