"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Divide, Lightbulb, Trophy } from "lucide-react"
import type { Category } from "@/lib/questions"
import { questions } from "@/lib/questions"

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void
}

export default function CategorySelection({ onSelectCategory }: CategorySelectionProps) {
  const categories = [
    {
      id: "matematica" as Category,
      title: "Razonamiento Matemático",
      description: "Secuencias numéricas, álgebra y lógica matemática",
      icon: Divide,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      id: "abstracto" as Category,
      title: "Pensamiento Abstracto",
      description: "Patrones, analogías y razonamiento lógico",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600",
    },
    {
      id: "espacial" as Category,
      title: "Orientación Espacial",
      description: "Visualización 3D, rotaciones y estructuras geométricas",
      icon: Lightbulb,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-600",
    },
  ]

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

      <div className="relative z-10 max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
              <Trophy className="w-10 h-10 text-slate-800" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-slate-800 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
            Test de IQ Avanzado
          </h1>
          <p className="text-lg text-slate-700 text-pretty font-semibold">
            Elige una categoría y demuestra tu inteligencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            const questionCount = questions[cat.id].length
            return (
              <Card
                key={cat.id}
                className="p-6 border-4 border-slate-800 hover:border-slate-900 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)] cursor-pointer group bg-white/90 backdrop-blur shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                onClick={() => onSelectCategory(cat.id)}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${cat.bgColor} flex items-center justify-center mb-4 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]`}
                >
                  <Icon className={`w-8 h-8 ${cat.textColor}`} />
                </div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">{cat.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-semibold">{questionCount} preguntas</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary/10 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] font-bold"
                  >
                    Comenzar →
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-6 bg-white/90 backdrop-blur border-4 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
              <span className="text-2xl">♥</span>
              <span className="text-2xl">♥</span>
              <span className="text-2xl">♥</span>
            </div>
            <div className="text-slate-700 font-semibold">
              Tienes 3 vidas - ¡Responde correctamente o perderás una vida!
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
