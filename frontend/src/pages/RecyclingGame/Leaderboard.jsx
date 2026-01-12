import React, { useState, useEffect } from 'react'

const difficulties = {
  easy: { label: 'Fácil', multiplier: 1 },
  medium: { label: 'Medio', multiplier: 1.5 },
  hard: { label: 'Difícil', multiplier: 2 },
  extreme: { label: 'Extremo', multiplier: 3 }
}

const randomNames = [
  'Alex', 'Sofía', 'Lucas', 'Emma', 'Mateo', 'Valeria', 
  'Daniel', 'Camila', 'Sebastián', 'Isabella', 'Liam', 'Olivia',
  'Noah', 'Ava', 'Ethan', 'Mia'
]

const generateUsers = (difficulty) => {
  const users = []
  for (let i = 0; i < 15; i++) {
    const baseScore = Math.floor(Math.random() * 500 + 200)
    const score = Math.floor(baseScore * difficulties[difficulty].multiplier)
    const gender = Math.random() > 0.5 ? 'men' : 'women'
    const avatarId = Math.floor(Math.random() * 99)
    users.push({
      id: i,
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      score,
      avatar: `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`
    })
  }
  return users.sort((a, b) => b.score - a.score)
}

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [difficulty, setDifficulty] = useState('easy')

  const regenerate = () => setUsers(generateUsers(difficulty))

  useEffect(() => {
    setUsers(generateUsers(difficulty))
  }, [difficulty])

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4 flex-wrap">
        {Object.keys(difficulties).map((key) => (
          <button
            key={key}
            onClick={() => setDifficulty(key)}
            className={`px-5 py-3 rounded-2xl font-semibold text-lg transition ${
              difficulty === key ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'
            }`}
          >
            {difficulties[key].label}
          </button>
        ))}
        <button
          onClick={regenerate}
          className="px-5 py-3 rounded-2xl font-semibold text-lg bg-amber-500 text-white hover:bg-amber-600 transition"
        >
          Regenerar
        </button>
      </div>

      <div className="flex justify-center items-end gap-12">
        {users.slice(0, 3).map((u, i) => (
          <div
            key={u.id}
            className={`flex flex-col items-center p-4 rounded-2xl ${
              i === 0 ? 'bg-amber-400/20' : i === 1 ? 'bg-slate-400/20' : 'bg-rose-400/20'
            }`}
          >
            <div className="relative">
              <img
                src={u.avatar}
                alt={u.name}
                className={`rounded-full border-4 border-emerald-400 ${
                  i === 0 ? 'w-28 h-28' : i === 1 ? 'w-24 h-24' : 'w-20 h-20'
                }`}
              />
              <div className="absolute -bottom-3 right-0 text-2xl">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
              </div>
            </div>
            <p className="mt-3 text-xl font-semibold">{u.name}</p>
            <p className="text-slate-200 text-lg">{u.score} pts</p>
          </div>
        ))}
      </div>

      <div className="max-h-[500px] overflow-y-auto space-y-3 px-4">
        {users.slice(3).map((u, idx) => (
          <div
            key={u.id}
            className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 font-bold">{idx + 4}</span>
              <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full" />
              <span className="font-semibold text-lg">{u.name}</span>
            </div>
            <span className="font-bold text-lg">{u.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}
