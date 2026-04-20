import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error de autenticación");
      }

      login(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-teal-900 to-emerald-800 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 px-4">
        <div className="bg-slate-950/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(52,211,153,0.4)] mb-4 text-2xl">
              A
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-emerald-300">
              APRA Learning Systems
            </h1>
            <p className="text-gray-400 text-sm mt-1">Acceso al Campus Virtual</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 pl-1">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@apra.edu.com"
                  className="pl-10 pr-4 py-3 w-full bg-black/20 border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:bg-black/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 pl-1">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-4 py-3 w-full bg-black/20 border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:bg-black/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Iniciar Sesión"}
              </button>
            </div>
            
            <div className="text-center mt-6">
               <p className="text-xs text-emerald-500/80 font-medium tracking-wide">Desarrollado por APRA Learning Systems</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
