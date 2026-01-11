import { User, Mail, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

export default function Profile() {
  const { user } = useAuth()

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
              <User className="h-10 w-10 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white">
                Perfil de Usuario
              </h1>
              <p className="text-slate-400 text-sm">
                Información de tu cuenta
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl">
              <User className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Usuario</p>
                <p className="text-white">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl">
              <Mail className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-white">
                  {user?.email || 'No registrado'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl">
              <Shield className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Rol</p>
                <p className="text-white">
                  {user?.role || 'Usuario'}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
