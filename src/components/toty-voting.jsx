import { useState, useEffect } from "react"
import { PlayerCard } from "./player-card"
import { VoteSummary } from "./vote-summary"

export const Position = {
  GOALKEEPERS: "goalkeepers",
  DEFENDERS: "defenders",
  MIDFIELDERS: "midfielders",
  ATTACKERS: "attackers"
}

const players = {
  goalkeepers: [
    { id: "gk1", name: "Franco", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "gk2", name: "Axel", country: "AR", club: "Fulbol", image: "public/toty.png" },
    { id: "gk3", name: "Gaby", country: "AR", club: "Padel", image: "public/toty.png" },
  ],
  defenders: [
    { id: "df1", name: "Dilan", country: "AR", club: "Padel", image: "public/toty.png" },
    { id: "df2", name: "Dilan Garcia", country: "AR", club: "Padel", image: "public/toty.png" },
    { id: "df3", name: "Matein", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "df4", name: "Pollo", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "df5", name: "Pedro", country: "AR", club: "Fulbol", image: "public/toty.png" },
    { id: "df6", name: "Jose", country: "AR", club: "Fulbol", image: "public/toty.png" },
  ],
  midfielders: [
    { id: "mf1", name: "Gabi", country: "AR", club: "Fulbol", image: "public/toty.png" },
    { id: "mf2", name: "Chino", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "mf3", name: "Tucu", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "mf4", name: "Facu", country: "AR", club: "Padel", image: "public/toty.png" },
    { id: "mf5", name: "Fernando", country: "AR", club: "Fubol", image: "public/toty.png" },
    { id: "mf6", name: "Negro Gonzalez", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
  ],
  attackers: [  
    { id: "at6", name: "Molina", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "at7", name: "Genaro L", country: "AR", club: "Padel", image: "public/toty.png" },
    { id: "at8", name: "Homero", country: "AR", club: "Padel", image: "public/toty.png" },
    { id: "at9", name: "Kevin", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "at10", name: "Ramiro", country: "AR", club: "Sablazo Legui", image: "public/toty.png" },
    { id: "at11", name: "Goncho", country: "AR", club: "Padel", image: "public/toty.png" },
  ],
}

const positionLimits = {
  goalkeepers: 1,
  defenders: 4,
  midfielders: 3,
  attackers: 3,
}

const positionLabels = {
  goalkeepers: "Goalkeepers",
  defenders: "Defenders",
  midfielders: "Midfielders",
  attackers: "Attackers",
}

export default function TotyVoting() {
  const [activeTab, setActiveTab] = useState("goalkeepers")
  const [votes, setVotes] = useState({
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    attackers: [],
  })
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    const savedVotes = localStorage.getItem("toty-votes")
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
  }, [])

  const saveVotes = (newVotes) => {
    setVotes(newVotes)
    localStorage.setItem("toty-votes", JSON.stringify(newVotes))
  }

  const toggleVote = (playerId) => {
    const currentVotes = votes[activeTab]
    const limit = positionLimits[activeTab]

    let newPositionVotes

    if (currentVotes.includes(playerId)) {
      newPositionVotes = currentVotes.filter((id) => id !== playerId)
    } else {
      if (currentVotes.length >= limit) {
        return
      }
      newPositionVotes = [...currentVotes, playerId]
    }

    const newVotes = { ...votes, [activeTab]: newPositionVotes }
    saveVotes(newVotes)
  }

  const resetVotes = () => {
    const emptyVotes = {
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      attackers: [],
    }
    saveVotes(emptyVotes)
    setShowSummary(false)
  }

  const totalVotes =
    votes.goalkeepers.length + votes.defenders.length + votes.midfielders.length + votes.attackers.length

  const isComplete =
    votes.goalkeepers.length === 1 &&
    votes.defenders.length === 4 &&
    votes.midfielders.length === 3 &&
    votes.attackers.length === 3

  if (showSummary) {
    return <VoteSummary votes={votes} players={players} onBack={() => setShowSummary(false)} onReset={resetVotes} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <div className="h-8 w-px bg-blue-700/50" />
              <div className="flex flex-col items-center">
                <span className="text-amber-400 font-bold text-xs tracking-wider">TOTY</span>
                <span className="text-blue-400 text-[10px]">25</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white ml-4">Team of the Year</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-blue-300 text-sm">Seleccionados</p>
              <p className="text-white font-bold text-lg">{totalVotes}/11</p>
            </div>
            {isComplete && (
              <button
                onClick={() => setShowSummary(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold px-6 py-2 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                Ver Equipo
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Position Tabs */}
      <nav className="sticky top-0 z-10 bg-[#0a1628]/95 backdrop-blur-sm border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-4">
            {Object.keys(players).map((position) => (
              <button
                key={position}
                onClick={() => setActiveTab(position)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === position
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                    : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/40"
                }`}
              >
                {positionLabels[position]}
                <span className="ml-2 text-xs opacity-75">
                  ({votes[position].length}/{positionLimits[position]})
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{positionLabels[activeTab]}</h2>
          <p className="text-blue-300">
            Selecciona {positionLimits[activeTab]} {positionLimits[activeTab] === 1 ? "jugador" : "jugadores"}
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
          {players[activeTab].map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={votes[activeTab].includes(player.id)}
              onToggle={() => toggleVote(player.id)}
              disabled={!votes[activeTab].includes(player.id) && votes[activeTab].length >= positionLimits[activeTab]}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 text-center text-blue-400 text-sm">
          <p>Men's Nominees</p>
        </div>
      </main>

      {/* Reset Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={resetVotes}
          className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg"
        >
          Reiniciar Votos
        </button>
      </div>
    </div>
  )
}

