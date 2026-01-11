import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Leaf,
  Menu,
  X,
  LayoutDashboard,
  Lightbulb,
  Globe
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileMenu from './profile/ProfileMenu'

export default function Navbar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

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
              <motion.div whileHover={{ scale: 1.15 }} className="p-2 rounded-full hover:bg-white/5">
                <Link to="/tips">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                </Link>
              </motion.div>
            </div>

            <div className="relative group">
              <motion.div whileHover={{ scale: 1.15 }} className="p-2 rounded-full hover:bg-white/5">
                <Link to="/impact">
                  <Globe className="h-5 w-5 text-emerald-400" />
                </Link>
              </motion.div>
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

                <div className="pl-4 border-l border-slate-700">
                  <ProfileMenu />
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
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300">
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
              <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
              <Link to="/tips" onClick={() => setIsOpen(false)}>Tips Eco</Link>
              <Link to="/impact" onClick={() => setIsOpen(false)}>Impacto</Link>

              {user && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
