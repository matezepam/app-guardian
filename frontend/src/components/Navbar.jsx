import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Menu, X, LogOut, User, LayoutDashboard, Lightbulb, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              EcoGuardian
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Inicio
            </Link>

            <Link to="/tips" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors">
              <Lightbulb className="h-4 w-4" />
              Tips Eco
            </Link>

            <Link to="/impact" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors">
              <Globe className="h-4 w-4" />
              Impacto
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4" />
                    {user.username}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all duration-300"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-green-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
                Inicio
              </Link>

              <Link to="/tips" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
                Tips Eco
              </Link>

              <Link to="/impact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
                Impacto Ambiental
              </Link>

              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm text-gray-500 font-medium">
                    Hola, {user.username}
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-green-600 bg-green-50 hover:bg-green-100">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
