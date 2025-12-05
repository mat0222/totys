import { Check } from "lucide-react"

export function PlayerCard({ player, isSelected, onToggle, disabled }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative group transition-all duration-300 ${
        disabled && !isSelected ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isSelected
            ? "ring-2 ring-amber-400 shadow-lg shadow-amber-500/30 scale-105"
            : "hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
        }`}
      >
        {/* Card Background */}
        <div className="relative bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 p-1">
          {/* TOTY Badge */}
          <div className="absolute top-1 left-1 z-10">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-[8px] font-bold text-black px-1 rounded">
              TOTY
            </div>
          </div>

          {/* Selection Check */}
          {isSelected && (
            <div className="absolute top-1 right-1 z-10 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-black" />
            </div>
          )}

          {/* Player Image */}
          <div className="relative aspect-[4/5] bg-gradient-to-b from-blue-700/50 to-transparent rounded-t overflow-hidden">
            <img
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/placeholder.svg"
              }}
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
          </div>

          {/* Player Info */}
          <div className="relative bg-gradient-to-b from-blue-900 to-blue-950 p-2 pt-1">
            <p className="text-white font-bold text-[10px] sm:text-xs truncate text-center">{player.name}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-sm">{player.country}</span>
              <span className="text-blue-400 text-[9px] truncate">{player.club}</span>
            </div>
          </div>
        </div>

        {/* Card Border Glow */}
        <div
          className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${
            isSelected
              ? "opacity-100 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent"
              : "opacity-0 group-hover:opacity-50 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent"
          }`}
        />
      </div>
    </button>
  )
}

