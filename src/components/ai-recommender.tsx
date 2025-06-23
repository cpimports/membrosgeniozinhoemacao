"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities, type Activity } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

interface AIRecommenderProps {
  onActivityClick: (activity: Activity) => void;
}

export function AIRecommender({ onActivityClick }: AIRecommenderProps) {
  // In a real app, these recommendations would come from an AI model.
  const recommendedActivities = activities.slice(0, 3);

  return (
    <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-bold text-primary">Especialmente para você!</CardTitle>
        </div>
        <CardDescription>Com base no que você gosta, achamos que vai adorar estas atividades:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedActivities.map(activity => (
            <div 
              key={activity.id} 
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              onClick={() => onActivityClick(activity)}
            >
              <Image
                src={activity.thumbnailUrl}
                alt={activity.title}
                width={300}
                height={180}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={activity.aiHint}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              <div className="absolute bottom-0 left-0 p-3">
                <h3 className="text-sm font-bold text-white line-clamp-2">{activity.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
