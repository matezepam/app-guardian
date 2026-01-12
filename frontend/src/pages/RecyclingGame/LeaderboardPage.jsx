import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Leaderboard from './Leaderboard'

export default function LeaderboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <h1 className="text-3xl text-center font-bold text-emerald-400 mb-6">🏆 Podio Eco</h1>
      <div className="max-w-4xl mx-auto bg-slate-900 p-6 rounded-2xl shadow-lg">
        <Leaderboard />
      </div>
    </div>
  )
}
