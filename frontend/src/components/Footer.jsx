import { Leaf, Droplets, Zap, Trash2, Heart, Mail, Phone, MapPin, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className={`pt-16 pb-8 transition-colors duration-300 ${user ? 'bg-green-900 border-t-4 border-green-500 text-green-50' : 'bg-gray-900 text-gray-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className={`h-6 w-6 ${user ? 'text-white' : 'text-green-500'}`} />
              <span className="text-2xl font-bold text-white">EcoGuardian</span>
            </div>
            <p className={`text-sm leading-relaxed ${user ? 'text-green-100' : 'text-gray-400'}`}>
              {user ? 
                "Gracias por ser parte del cambio. Juntos estamos construyendo un futuro más sostenible." :
                "Empoderando a las personas para tomar el control de su impacto ambiental. Pequeños cambios hacen una gran diferencia."
              }
            </p>
          </div>

          {/* Quick Links / Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {user ? "Navegación" : "Enlaces Rápidos"}
            </h3>
            <ul className="space-y-2">
              {user ? (
                <>
                  <li><Link to="/dashboard" className="hover:text-green-400 transition-colors flex items-center gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link></li>
                  <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2"><Leaf className="h-4 w-4" /> Inicio</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className="hover:text-green-400 transition-colors">Inicio</Link></li>
                  <li><Link to="/login" className="hover:text-green-400 transition-colors">Iniciar Sesión</Link></li>
                  <li><Link to="/register" className="hover:text-green-400 transition-colors">Registrarse</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Resources - Always visible but maybe different context */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {user ? "Tus Guías" : "Recursos"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Droplets className="h-4 w-4" /> Ahorro de Agua</li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4" /> Eficiencia Energética</li>
              <li className="flex items-center gap-2"><Trash2 className="h-4 w-4" /> Reciclaje</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-500" />
                <span>contacto@ecoguardian.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <span>Planeta Tierra</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
            Hecho con <Heart className="h-4 w-4 text-red-500" /> por EcoGuardian Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
