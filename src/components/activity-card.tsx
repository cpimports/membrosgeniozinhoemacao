"use client";

import Image from "next/image";
import { Eye, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Activity } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onView: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  isFavorite,
  onToggleFavorite,
  onView,
}: ActivityCardProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    // This would trigger a download from Firebase Storage
    toast({
      title: "Download iniciado!",
      description: `Baixando a atividade "${activity.title}".`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group animate-in fade-in-50 zoom-in-95">
      <CardHeader className="p-0 relative">
        <Image
          src={activity.thumbnailUrl}
          alt={`Thumbnail da atividade ${activity.title}`}
          width={400}
          height={250}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={activity.aiHint}
        />
        <Button
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full h-9 w-9 bg-background/70 hover:bg-background/90 text-slate-500",
            isFavorite && "text-yellow-400"
          )}
          variant="ghost"
          onClick={() => onToggleFavorite(activity.id)}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Star className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{activity.category}</Badge>
        <CardTitle className="text-base font-bold leading-tight line-clamp-2">
          {activity.title}
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          className="flex-1"
          onClick={() => onView(activity)}
        >
          <Eye className="mr-2 h-4 w-4" /> Visualizar
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </CardFooter>
    </Card>
  );
}
