"use client"

import { useState } from "react"
import IntroLobby from "@/components/intro-lobby"
import BattleArena from "@/components/battle-arena"

export default function Home() {
  const [gameState, setGameState] = useState<"lobby" | "battle" | "level2-lobby">("lobby")
  const [enemiesDefeated, setEnemiesDefeated] = useState(0)

  const handleStartGame = () => {
    setGameState("battle")
    setEnemiesDefeated(0)
  }

  const handleBattleComplete = (defeated: number) => {
    setEnemiesDefeated(defeated)
    if (defeated >= 4) {
      setGameState("level2-lobby")
    }
  }

  const handleLevel2Start = () => {
    // Por ahora regresa a batalla, pero puedes agregar nivel 2 después
    setGameState("battle")
  }

  const handleReturnToStart = () => {
    setGameState("lobby")
    setEnemiesDefeated(0)
  }

  if (gameState === "battle") {
    return <BattleArena onBattleComplete={handleBattleComplete} />
  }

  if (gameState === "level2-lobby") {
    return <IntroLobby onStartGame={handleLevel2Start} dialogueType="level2" onReturnToStart={handleReturnToStart} />
  }

  return <IntroLobby onStartGame={handleStartGame} dialogueType="initial" />
}
