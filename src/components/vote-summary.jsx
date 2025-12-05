import { ArrowLeft, RotateCcw } from "lucide-react"

const generateStats = (position) => {
  const baseStats = {
    goalkeepers: { PAC: [75, 85], SHO: [15, 25], PAS: [70, 85], DRI: [50, 65], DEF: [30, 45], PHY: [80, 92] },
    defenders: { PAC: [70, 90], SHO: [45, 65], PAS: [70, 88], DRI: [65, 82], DEF: [85, 95], PHY: [80, 92] },
    midfielders: { PAC: [75, 92], SHO: [75, 90], PAS: [85, 97], DRI: [85, 95], DEF: [55, 80], PHY: [70, 88] },
    attackers: { PAC: [88, 99], SHO: [90, 99], PAS: [80, 95], DRI: [90, 99], DEF: [30, 50], PHY: [70, 88] },
  }
  const range = baseStats[position]
  return {
    PAC: Math.floor(Math.random() * (range.PAC[1] - range.PAC[0]) + range.PAC[0]),
    SHO: Math.floor(Math.random() * (range.SHO[1] - range.SHO[0]) + range.SHO[0]),
    PAS: Math.floor(Math.random() * (range.PAS[1] - range.PAS[0]) + range.PAS[0]),
    DRI: Math.floor(Math.random() * (range.DRI[1] - range.DRI[0]) + range.DRI[0]),
    DEF: Math.floor(Math.random() * (range.DEF[1] - range.DEF[0]) + range.DEF[0]),
    PHY: Math.floor(Math.random() * (range.PHY[1] - range.PHY[0]) + range.PHY[0]),
  }
}

const getPositionAbbr = (position, index) => {
  const abbrs = {
    goalkeepers: ["GK"],
    defenders: ["CB", "LB", "RB", "CB"],
    midfielders: ["CM", "CDM", "CAM"],
    attackers: ["ST", "LW", "RW"],
  }
  return abbrs[position][index % abbrs[position].length]
}

const getRating = (position) => {
  const ratings = {
    goalkeepers: [96, 97],
    defenders: [94, 95, 96],
    midfielders: [95, 96, 97],
    attackers: [97, 98, 99],
  }
  const range = ratings[position]
  return range[Math.floor(Math.random() * range.length)]
}

export function VoteSummary({ votes, players, onBack, onReset }) {
  const getSelectedPlayers = (position) => {
    return votes[position].map((id) => players[position].find((p) => p.id === id)).filter(Boolean)
  }

  const allSelectedPlayers = [
    ...getSelectedPlayers("midfielders").map((p, i) => ({ ...p, position: "midfielders", index: i })),
    ...getSelectedPlayers("attackers")
      .slice(0, 1)
      .map((p, i) => ({ ...p, position: "attackers", index: i })),
    ...getSelectedPlayers("goalkeepers").map((p, i) => ({ ...p, position: "goalkeepers", index: i })),
    ...getSelectedPlayers("defenders")
      .slice(0, 2)
      .map((p, i) => ({ ...p, position: "defenders", index: i })),
  ]

  const secondRow = [
    ...getSelectedPlayers("defenders")
      .slice(2)
      .map((p, i) => ({ ...p, position: "defenders", index: i + 2 })),
    ...getSelectedPlayers("attackers")
      .slice(1)
      .map((p, i) => ({ ...p, position: "attackers", index: i + 1 })),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0d1528] to-[#080c14] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-96 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-0 w-32 h-32 bg-blue-600/40 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
      </div>
      <div className="absolute top-0 right-0 w-64 h-96 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-0 w-32 h-32 bg-blue-600/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-40 pointer-events-none">
        <div className="absolute bottom-10 left-5 w-20 h-20 bg-amber-600/30 rounded-full blur-2xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-40 pointer-events-none">
        <div className="absolute bottom-10 right-5 w-20 h-20 bg-amber-600/30 rounded-full blur-2xl" />
      </div>

      <header className="relative z-10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <div className="h-8 w-px bg-blue-700/50" />
                <div className="flex flex-col items-center px-2 py-1 border border-amber-400/50 rounded">
                  <span className="text-amber-400 font-bold text-[10px] tracking-widest">TEAM OF</span>
                  <span className="text-amber-400 font-bold text-[10px] tracking-widest">THE YEAR</span>
                </div>
              </div>
            </div>
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reiniciar</span>
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-blue-400/70 text-xs tracking-[0.3em] uppercase mb-2">Equipo Del Año</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200">
              The World's Best
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-8">
        {/* Primera fila - 6 jugadores */}
        <div className="flex justify-center gap-2 md:gap-4 mb-4 flex-wrap">
          {allSelectedPlayers.slice(0, 6).map((player, idx) => (
            <TotyCard key={player.id} player={player} position={player.position} positionIndex={player.index} />
          ))}
        </div>

        {/* Segunda fila - 5 jugadores */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {[...secondRow, ...allSelectedPlayers.slice(6)].slice(0, 5).map((player, idx) => (
            <TotyCard key={player.id} player={player} position={player.position} positionIndex={player.index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-300/70 mb-4 text-sm">Tu equipo ideal TOTY 2025</p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-amber-500/20">
              Compartir
            </button>
            <button
              onClick={onBack}
              className="bg-blue-900/50 hover:bg-blue-800/50 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-blue-700/50"
            >
              Editar Selección
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function TotyCard({ player, position, positionIndex }) {
  const stats = generateStats(position)
  const rating = getRating(position)
  const posAbbr = getPositionAbbr(position, positionIndex)

  return (
    <div className="relative group">
      {/* Decoración de flores/pompones azules */}
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-1 -right-2 w-6 h-6 bg-blue-600/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Tarjeta principal */}
      <div className="relative w-24 sm:w-28 md:w-32 lg:w-36 bg-gradient-to-b from-[#1a2a5e] via-[#0f1a3d] to-[#0a1230] rounded-lg overflow-hidden border border-blue-500/30 shadow-xl shadow-blue-900/50 hover:shadow-blue-500/30 transition-all hover:scale-105">
        {/* Patrón de fondo cristalino */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]" />
        </div>

        {/* Rating y Posición */}
        <div className="relative p-1.5 sm:p-2">
          <div className="flex justify-between items-start mb-1">
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-bold text-lg sm:text-xl md:text-2xl leading-none">{rating}</span>
              <span className="text-amber-400/80 text-[8px] sm:text-[10px] font-semibold">{posAbbr}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-lg">{player.country}</span>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-[6px] sm:text-[8px] text-white font-bold">
                  {player.club.slice(0, 3).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Imagen del jugador */}
          <div className="relative aspect-square bg-gradient-to-b from-blue-800/30 to-transparent rounded overflow-hidden mb-1">
            <img
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/placeholder.svg"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1230] via-transparent to-transparent" />
          </div>

          {/* Nombre del jugador */}
          <div className="text-center mb-1.5">
            <p className="text-amber-100 font-bold text-[9px] sm:text-[10px] md:text-xs truncate uppercase tracking-wide">
              {player.name}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-x-1 gap-y-0.5 text-[6px] sm:text-[7px] md:text-[8px]">
            <div className="flex justify-between">
              <span className="text-amber-400/70">PAC</span>
              <span className="text-amber-100 font-semibold">{stats.PAC}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400/70">SHO</span>
              <span className="text-amber-100 font-semibold">{stats.SHO}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400/70">PAS</span>
              <span className="text-amber-100 font-semibold">{stats.PAS}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400/70">DRI</span>
              <span className="text-amber-100 font-semibold">{stats.DRI}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400/70">DEF</span>
              <span className="text-amber-100 font-semibold">{stats.DEF}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400/70">PHY</span>
              <span className="text-amber-100 font-semibold">{stats.PHY}</span>
            </div>
          </div>
        </div>

        {/* Borde brillante */}
        <div className="absolute inset-0 rounded-lg border border-blue-400/20 pointer-events-none" />
      </div>
    </div>
  )
}

