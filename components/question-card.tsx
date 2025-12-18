"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions"

interface QuestionCardProps {
  question: Question
  onAnswer: (option: number) => void
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <Card className="p-6 md:p-8 border-4 border-slate-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] bg-white/90 backdrop-blur">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-balance text-slate-800">{question.question}</h3>
        {question.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={question.image || "/placeholder.svg"}
              alt="Question visual"
              className="max-w-full h-auto rounded-lg border-4 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]"
            />
          </div>
        )}
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(index)}
            variant="secondary"
            className="w-full justify-start text-left h-auto py-4 px-6 text-base font-semibold border-3 border-slate-800 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all bg-white"
          >
            <span className="font-bold mr-3 text-primary text-lg">{String.fromCharCode(65 + index)}.</span>
            {option}
          </Button>
        ))}
      </div>
    </Card>
  )
}
