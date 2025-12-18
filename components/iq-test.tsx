"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Divide, Lightbulb, ArrowLeft } from "lucide-react"
import QuestionCard from "./question-card"
import ResultsScreen from "./results-screen"
import { questions, type Category } from "@/lib/questions"

interface IQTestProps {
  category: Category
  onExit: () => void
}

export default function IQTest({ category, onExit }: IQTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const categoryQuestions = questions[category]
  const currentQuestion = categoryQuestions[currentQuestionIndex]

  const categoryInfo = {
    matematica: { icon: Divide, label: "Razonamiento Matemático", color: "text-blue-600" },
    abstracto: { icon: Brain, label: "Pensamiento Abstracto", color: "text-purple-600" },
    espacial: { icon: Lightbulb, label: "Orientación Espacial", color: "text-orange-600" },
  }

  const handleAnswer = (selectedOption: number) => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    } else {
      setLives(lives - 1)
      if (lives - 1 === 0) {
        setFinished(true)
        return
      }
    }

    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setLives(3)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={categoryQuestions.length}
        onRestart={handleRestart}
        onExit={onExit}
        category={category}
      />
    )
  }

  const CategoryIcon = categoryInfo[category].icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20">
        <div className="absolute bottom-0 left-0 w-16 h-32 bg-slate-700 rounded-t-lg" style={{ left: "5%" }} />
        <div className="absolute bottom-0 w-12 h-40 bg-slate-700 rounded-t-lg" style={{ left: "15%" }} />
        <div className="absolute bottom-0 w-20 h-36 bg-slate-700 rounded-t-lg" style={{ left: "25%" }} />
        <div className="absolute bottom-0 w-10 h-28 bg-slate-700 rounded-t-lg" style={{ left: "40%" }} />
        <div className="absolute bottom-0 w-14 h-44 bg-slate-700 rounded-t-lg" style={{ left: "50%" }} />
        <div className="absolute bottom-0 w-16 h-32 bg-slate-700 rounded-t-lg" style={{ left: "65%" }} />
        <div className="absolute bottom-0 w-12 h-38 bg-slate-700 rounded-t-lg" style={{ left: "78%" }} />
        <div className="absolute bottom-0 w-18 h-42 bg-slate-700 rounded-t-lg" style={{ left: "90%" }} />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 p-4 bg-white/90 backdrop-blur border-4 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onExit}
                  className="border-2 border-slate-800 hover:bg-slate-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-slate-800">
                  <CategoryIcon className="w-5 h-5 text-white" />
                  <span className="font-bold text-white text-sm">{categoryInfo[category].label}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {/* Personaje stick figure */}
                    <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-lg">
                      {/* Cabeza */}
                      <circle cx="20" cy="10" r="8" fill="#2d3748" stroke="#000" strokeWidth="2" />
                      {/* Cuerpo */}
                      <line x1="20" y1="18" x2="20" y2="38" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                      {/* Brazos */}
                      <line x1="20" y1="25" x2="10" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                      <line x1="20" y1="25" x2="30" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                      {/* Piernas */}
                      <line x1="20" y1="38" x2="12" y2="52" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                      <line x1="20" y1="38" x2="28" y2="52" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Vidas con estilo retro */}
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded border-2 border-slate-800 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] ${
                          i < lives
                            ? "bg-gradient-to-b from-red-400 to-red-600 text-white"
                            : "bg-slate-300 text-slate-500"
                        }`}
                      >
                        {i < lives ? "♥" : "✕"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-2 bg-gradient-to-b from-green-400 to-green-600 border-2 border-slate-800 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
                  <div className="text-xs font-bold text-white/80">SCORE</div>
                  <div className="text-2xl font-bold text-white">{score}</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>PREGUNTA {currentQuestionIndex + 1}</span>
                <span>DE {categoryQuestions.length}</span>
              </div>
              <div className="w-full h-6 bg-slate-300 border-2 border-slate-800 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / categoryQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </div>
    </div>
  )
}
