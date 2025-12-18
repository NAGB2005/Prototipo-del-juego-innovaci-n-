"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Home } from "lucide-react"
import type { Category } from "@/lib/questions"

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onExit: () => void
  category: Category
}

export default function ResultsScreen({ score, totalQuestions, onRestart, onExit, category }: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const categoryNames = {
    matematica: "Razonamiento Matemático",
    abstracto: "Pensamiento Abstracto",
    espacial: "Orientación Espacial",
  }

  let message = ""

  if (percentage >= 90) {
    message = "¡Genio! Tu coeficiente intelectual es excepcional"
  } else if (percentage >= 75) {
    message = "¡Excelente! Tienes una inteligencia superior"
  } else if (percentage >= 60) {
    message = "¡Bien hecho! Estás por encima del promedio"
  } else if (percentage >= 40) {
    message = "Buen intento. Sigue practicando"
  } else {
    message = "No te rindas. La práctica hace al maestro"
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 relative overflow-hidden">
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

      <Card className="relative z-10 max-w-2xl w-full p-8 md:p-12 text-center border-4 border-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] bg-white/90 backdrop-blur">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <Trophy className="w-12 h-12 text-slate-800" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-slate-800 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          ¡Test Completado!
        </h1>
        <p className="text-lg text-slate-700 mb-4 font-semibold">{categoryNames[category]}</p>

        <p className="text-xl text-slate-700 mb-8 text-pretty font-semibold">{message}</p>

        <Card className="p-8 mb-8 bg-gradient-to-b from-white to-slate-50 border-4 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2 drop-shadow-sm">{score}</div>
              <div className="text-sm text-slate-700 font-semibold">Respuestas Correctas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2 drop-shadow-sm">{percentage}%</div>
              <div className="text-sm text-slate-700 font-semibold">Precisión</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2 drop-shadow-sm">{totalQuestions}</div>
              <div className="text-sm text-slate-700 font-semibold">Preguntas Totales</div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="px-8 border-3 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] font-bold bg-gradient-to-b from-green-400 to-green-600"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Intentar de Nuevo
          </Button>
          <Button
            onClick={onExit}
            size="lg"
            variant="outline"
            className="px-8 bg-white border-3 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] font-bold"
          >
            <Home className="w-5 h-5 mr-2" />
            Cambiar Categoría
          </Button>
        </div>
      </Card>
    </div>
  )
}
