"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
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

interface ActivityCardProps {
  activity: Activity;
  onView: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  onView,
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
          className="w-full h-40 object-cover"
          data-ai-hint={activity.aiHint}
        />
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
        >
          <Eye className="mr-2 h-4 w-4" /> Visualizar
        </Button>
      </CardFooter>
    </Card>
  );
}
