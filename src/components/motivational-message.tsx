"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const messages = [
  "Você é incrível!",
  "Continue praticando!",
  "Aprender é uma aventura divertida!",
  "Seu esforço está valendo a pena!",
  "Cada dia um novo aprendizado!",
  "Sua criatividade não tem limites!",
  "Parabéns pelo seu progresso!",
];

export function MotivationalMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  if (!message) return null;

  return (
    <Card className="h-full bg-accent/80 border-accent/90 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex h-full items-center gap-4">
        <div className="p-3 bg-white/50 rounded-full">
            <Sparkles className="text-accent-foreground h-6 w-6" />
        </div>
        <p className="text-lg font-bold text-accent-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
