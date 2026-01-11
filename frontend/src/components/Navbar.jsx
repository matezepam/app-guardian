import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Leaf,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  Lightbulb,
  Globe
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="p-2 rounded-full bg-emerald-500/10"
            >
              <Leaf className="h-6 w-6 text-emerald-400" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">

            <Link to="/" className="text-slate-300 hover:text-white transition">
              Inicio
            </Link>

            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="p-2 rounded-full hover:bg-white/5 transition"
              >
                <Link to="/tips">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute top-11 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-full shadow-xl"
              >
                Tips Eco
              </motion.span>
            </div>

            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="p-2 rounded-full hover:bg-white/5 transition"
              >
                <Link to="/impact">
                  <Globe className="h-5 w-5 text-emerald-400" />
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute top-11 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-full shadow-xl"
              >
                Impacto
              </motion.span>
            </div>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <User className="h-4 w-4" />
                    {user.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-300 hover:text-white">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800"
          >
            <div className="px-6 py-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white">
                Inicio
              </Link>
              <Link to="/tips" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white">
                Tips Eco
              </Link>
              <Link to="/impact" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white">
                Impacto
              </Link>

              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-300"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block text-emerald-400">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
