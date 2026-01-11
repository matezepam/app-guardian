import { Settings as SettingsIcon, Bell, Moon, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="p-5 rounded-full bg-emerald-500/10">
              <SettingsIcon className="h-10 w-10 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white">
                Configuración
              </h1>
              <p className="text-slate-400 text-sm">
                Ajustes de tu cuenta
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <div className="flex items-center justify-between bg-slate-800/40 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="text-emerald-400" />
                <span className="text-white">Notificaciones</span>
              </div>
              <span className="text-slate-400 text-sm">Próximamente</span>
            </div>

            <div className="flex items-center justify-between bg-slate-800/40 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="text-emerald-400" />
                <span className="text-white">Tema oscuro</span>
              </div>
              <span className="text-slate-400 text-sm">Activo</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              <LogOut />
              Cerrar sesión
            </button>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
