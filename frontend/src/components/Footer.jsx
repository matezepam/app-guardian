import {
  Leaf,
  Droplets,
  Zap,
  Recycle,
  Globe,
  Phone,
  MapPin,
  LayoutDashboard,
  Heart,
  AtSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Leaf className="text-slate-900" />
              </div>
              <span className="text-2xl font-extrabold text-white">
                Guardian
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-md">
              Guardian es una plataforma diseñada para transformar hábitos
              cotidianos en decisiones sostenibles. Medimos, analizamos y
              acompañamos a personas comprometidas con el cuidado del planeta.
            </p>

            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
                Sostenibilidad
              </span>
              <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
                Tecnología
              </span>
              <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
                Impacto real
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Plataforma</h3>
            <ul className="space-y-4">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 hover:text-emerald-400 transition"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="flex items-center gap-3 hover:text-emerald-400 transition"
                    >
                      <Leaf className="h-4 w-4" />
                      Inicio
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className="hover:text-emerald-400 transition">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-emerald-400 transition"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="hover:text-emerald-400 transition"
                    >
                      Crear cuenta
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Nuestro impacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Droplets className="h-4 w-4 text-blue-400" />
                Uso responsable del agua
              </li>
              <li className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-yellow-400" />
                Eficiencia energética
              </li>
              <li className="flex items-center gap-3">
                <Recycle className="h-4 w-4 text-emerald-400" />
                Reducción de residuos
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-emerald-400" />
                Conciencia ambiental
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <AtSign className="h-5 w-5 text-emerald-400" />
                eco.guardian@enviroment.com
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-emerald-400" />
                +593 97 971 0437
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-emerald-400" />
                Planeta Tierra
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EcoGuardian. Todos los derechos
            reservados.
          </p>

          <p className="flex items-center gap-2 text-sm text-slate-500">
            Hecho con <Heart className="h-4 w-4 text-red-500" /> por EcoGuardian Team
          </p>
        </div>
      </div>
    </footer>
  );
}
