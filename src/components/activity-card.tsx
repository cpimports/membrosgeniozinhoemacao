
"use client";

import Image from "next/image";
import { Eye, Lock } from "lucide-react";
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

interface ActivityCardProps {
  activity: Activity;
  onView: (activity: Activity) => void;
  isLocked?: boolean;
}

export function ActivityCard({
  activity,
  onView,
  isLocked = false,
}: ActivityCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-0 relative">
        <Image
          unoptimized
          src={activity.thumbnailUrl}
          alt={`Thumbnail da atividade ${activity.title}`}
          width={400}
          height={250}
          className={cn("w-full h-40 object-cover", isLocked && "grayscale")}
          data-ai-hint={activity.aiHint}
        />
        {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
            </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{activity.category}</Badge>
        <CardTitle className="text-base font-bold leading-tight line-clamp-2">
          {activity.title}
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onView(activity)}
          variant={isLocked ? "secondary" : "default"}
        >
          <Eye className="mr-2 h-4 w-4" /> {isLocked ? 'Visualizar' : 'Acessar Atividade'}
        </Button>
      </CardFooter>
    </Card>
  );
}
