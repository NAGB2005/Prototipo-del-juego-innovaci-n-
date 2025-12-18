"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { getRandomQuestionsByDifficulty, type Difficulty } from "@/lib/questions"

interface BattleArenaProps {
  onBattleComplete: (enemiesDefeated: number) => void
}

export default function BattleArena({ onBattleComplete }: BattleArenaProps) {
  const [playerHealth, setPlayerHealth] = useState(10)
  const [enemyHealth, setEnemyHealth] = useState(3)
  const [enemiesDefeated, setEnemiesDefeated] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isAttacking, setIsAttacking] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("facil")

  // Cargar 2 preguntas aleatorias al inicio de cada batalla
  useEffect(() => {
    loadNewQuestions()
  }, [enemiesDefeated])

  const loadNewQuestions = () => {
    const newQuestions = getRandomQuestionsByDifficulty(difficulty, 2)
    setQuestions(newQuestions)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    setIsAttacking(true)

    // Animación de ataque
    setTimeout(() => {
      if (correct) {
        // Jugador ataca al enemigo
        const newEnemyHealth = enemyHealth - 1
        setEnemyHealth(newEnemyHealth)

        if (newEnemyHealth <= 0) {
          // Enemigo derrotado
          const newDefeated = enemiesDefeated + 1
          setEnemiesDefeated(newDefeated)

          if (newDefeated >= 4) {
            // Completar nivel
            setTimeout(() => onBattleComplete(newDefeated), 1500)
          } else {
            // Nuevo enemigo
            setTimeout(() => {
              setEnemyHealth(3)
              // Incrementar dificultad progresivamente
              if (newDefeated === 1) setDifficulty("medio")
              if (newDefeated === 2) setDifficulty("dificil")
              if (newDefeated === 3) setDifficulty("experto")
              loadNewQuestions()
            }, 1500)
          }
        } else {
          // Siguiente pregunta
          setTimeout(() => {
            if (currentQuestion < 1) {
              setCurrentQuestion(currentQuestion + 1)
              setSelectedAnswer(null)
              setShowResult(false)
            } else {
              loadNewQuestions()
            }
          }, 1500)
        }
      } else {
        // Enemigo ataca al jugador
        const newPlayerHealth = playerHealth - 1
        setPlayerHealth(newPlayerHealth)

        if (newPlayerHealth <= 0) {
          // Game Over
          setTimeout(() => {
            alert("¡Has sido derrotado! Regresando al lobby...")
            window.location.reload()
          }, 1500)
        } else {
          // Siguiente pregunta
          setTimeout(() => {
            if (currentQuestion < 1) {
              setCurrentQuestion(currentQuestion + 1)
              setSelectedAnswer(null)
              setShowResult(false)
            } else {
              loadNewQuestions()
            }
          }, 1500)
        }
      }
      setIsAttacking(false)
    }, 1000)
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background battle scene */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Battle UI */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Top HUD */}
        <div className="flex justify-between items-start mb-8">
          {/* Player Stats (Right side) */}
          <div className="bg-[#2a1810]/95 border-4 border-[#8b6f47] rounded-lg p-4 backdrop-blur-sm">
            <p className="text-[#ffd700] font-bold text-lg mb-2" style={{ fontFamily: "serif" }}>
              GUERRERO
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < playerHealth ? "fill-red-600 text-red-600" : "fill-gray-600 text-gray-600"}`}
                />
              ))}
            </div>
            <p className="text-[#f5e6d3] text-sm mt-1">Vida: {playerHealth}/10</p>
          </div>

          {/* Enemy Stats (Left side) */}
          <div className="bg-[#2a1810]/95 border-4 border-[#8b6f47] rounded-lg p-4 backdrop-blur-sm">
            <p className="text-[#66ff66] font-bold text-lg mb-2" style={{ fontFamily: "serif" }}>
              GOBLIN
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < enemyHealth ? "fill-green-600 text-green-600" : "fill-gray-600 text-gray-600"}`}
                />
              ))}
            </div>
            <p className="text-[#f5e6d3] text-sm mt-1">Vida: {enemyHealth}/3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mb-4">
          <div className="inline-block bg-[#2a1810]/95 border-2 border-[#8b6f47] rounded-lg px-6 py-2">
            <p className="text-[#ffd700] font-bold text-xl" style={{ fontFamily: "serif" }}>
              Enemigos Derrotados: {enemiesDefeated}/4
            </p>
          </div>
        </div>

        {/* Character animations */}
        <div className="flex justify-between items-center mb-8 px-16">
          {/* Player character (right) */}
          <div
            className={`transition-transform duration-300 ${isAttacking && isCorrect ? "-translate-x-8 scale-110" : ""}`}
          >
            <div className="w-32 h-32 bg-gray-400 border-4 border-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-4xl">🛡️</span>
            </div>
          </div>

          {/* Enemy character (left) */}
          <div
            className={`transition-transform duration-300 ${isAttacking && !isCorrect ? "translate-x-8 scale-110" : ""}`}
          >
            <div className="w-32 h-32 bg-green-600 border-4 border-green-800 rounded-lg flex items-center justify-center">
              <span className="text-4xl">👹</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-[#2a1810]/95 border-4 border-[#8b6f47] shadow-2xl backdrop-blur-sm">
            <div className="p-8">
              {/* Difficulty indicator */}
              <div className="mb-4 text-center">
                <span className="inline-block bg-[#4a2511] px-4 py-1 border-2 border-[#8b6f47] rounded-lg text-[#ffd700] font-bold">
                  Dificultad: {difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question */}
              <div className="bg-[#1a0f08] border-2 border-[#8b6f47] rounded-lg p-6 mb-6">
                <p className="text-[#f5e6d3] text-xl leading-relaxed" style={{ fontFamily: "serif" }}>
                  Pregunta {currentQuestion + 1}/2: {question.question}
                </p>
                {question.image && (
                  <img
                    src={question.image || "/placeholder.svg"}
                    alt="Pregunta"
                    className="mt-4 max-w-full h-auto rounded border-2 border-[#8b6f47]"
                  />
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {question.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`p-6 text-lg font-bold border-4 transition-all ${
                      selectedAnswer === index
                        ? "bg-[#5a8a2a] border-[#7ab83a] text-white scale-105"
                        : "bg-[#4a2511] border-[#8b6f47] text-[#f5e6d3] hover:bg-[#5a3521]"
                    } ${
                      showResult && index === question.correctAnswer
                        ? "bg-green-600 border-green-400"
                        : showResult && selectedAnswer === index && !isCorrect
                          ? "bg-red-600 border-red-400"
                          : ""
                    }`}
                    style={{ fontFamily: "serif" }}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Result message */}
              {showResult && (
                <div
                  className={`text-center p-4 rounded-lg border-2 mb-4 ${isCorrect ? "bg-green-900/50 border-green-500" : "bg-red-900/50 border-red-500"}`}
                >
                  <p className="text-white text-xl font-bold" style={{ fontFamily: "serif" }}>
                    {isCorrect ? "¡Correcto! Atacas al enemigo 🗡️" : "¡Incorrecto! El enemigo te ataca 💥"}
                  </p>
                </div>
              )}

              {/* Submit button */}
              {!showResult && (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full py-6 text-xl font-bold bg-[#6b1a1a] hover:bg-[#8b2424] text-[#f5e6d3] border-4 border-[#a03030] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "serif" }}
                >
                  ATACAR
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Pixel art overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.03)_0px,rgba(0,0,0,0.03)_2px,transparent_2px,transparent_4px)] opacity-30" />
    </div>
  )
}
