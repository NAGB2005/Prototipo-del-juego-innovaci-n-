"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface IntroLobbyProps {
  onStartGame: () => void
  dialogueType: "initial" | "level2"
  onReturnToStart?: () => void
}

export default function IntroLobby({ onStartGame, dialogueType, onReturnToStart }: IntroLobbyProps) {
  const dialogue = {
    initial: "Bienvenido a esta mazmorra matemática, ¿Estás listo para empezar el juego?",
    level2: "¡WOW!, te has vuelto muy fuerte, ¿estás listo para el segundo nivel?",
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex items-end justify-center p-8">
        <Card className="max-w-2xl w-full bg-[#2a1810]/95 border-4 border-[#8b6f47] shadow-2xl backdrop-blur-sm">
          <div className="p-8">
            {/* Character name tag */}
            <div className="mb-4 inline-block bg-[#4a2511] px-6 py-2 border-2 border-[#8b6f47] rounded-lg">
              <p className="text-[#ffd700] font-bold text-xl tracking-wider" style={{ fontFamily: "serif" }}>
                MAGO
              </p>
            </div>

            {/* Dialogue text */}
            <div className="bg-[#1a0f08] border-2 border-[#8b6f47] rounded-lg p-6 mb-6">
              <p className="text-[#f5e6d3] text-2xl leading-relaxed" style={{ fontFamily: "serif" }}>
                {dialogue[dialogueType]}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-6 justify-center">
              <Button
                onClick={onStartGame}
                className="px-12 py-6 text-2xl font-bold bg-[#2d5016] hover:bg-[#3d6820] text-[#f5e6d3] border-4 border-[#5a8a2a] shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ fontFamily: "serif" }}
              >
                SÍ
              </Button>
              <Button
                onClick={() => {
                  if (dialogueType === "level2" && onReturnToStart) {
                    onReturnToStart()
                  } else {
                    window.location.reload()
                  }
                }}
                className="px-12 py-6 text-2xl font-bold bg-[#6b1a1a] hover:bg-[#8b2424] text-[#f5e6d3] border-4 border-[#a03030] shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ fontFamily: "serif" }}
              >
                NO
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Pixel art style overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.03)_0px,rgba(0,0,0,0.03)_2px,transparent_2px,transparent_4px)] opacity-30" />
    </div>
  )
}
