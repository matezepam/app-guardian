import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-white/5 transition"
      >
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold uppercase">
            {currentUser?.username?.charAt(0)}
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-5 py-4 border-b border-slate-800">
              <p className="text-sm text-slate-400">Conectado como</p>
              <p className="font-semibold text-white truncate">
                {currentUser?.email}
              </p>
            </div>

            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/profile')
                  setOpen(false)
                }}
                className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5 transition"
              >
                <User className="h-4 w-4" />
                Perfil
              </button>

              <button
                onClick={() => {
                  navigate('/settings')
                  setOpen(false)
                }}
                className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5 transition"
              >
                <Settings className="h-4 w-4" />
                Configuración
              </button>
            </div>

            <div className="border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
