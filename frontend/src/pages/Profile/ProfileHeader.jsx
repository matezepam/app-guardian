import { motion } from 'framer-motion'
import { User } from 'lucide-react'

export default function ProfileHeader({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8 flex items-center gap-6"
    >
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User className="w-12 h-12 text-emerald-600" />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </motion.div>
  )
}
