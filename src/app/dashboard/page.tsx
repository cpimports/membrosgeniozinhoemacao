"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityCard } from "@/components/activity-card";
import { ActivityViewModal } from "@/components/activity-view-modal";
import { MotivationalMessage } from "@/components/motivational-message";
import { activities, categories, type Activity } from "@/lib/mock-data";
import { Heart, Search, Star, Trophy } from "lucide-react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(
    new Set(activities.filter((a) => a.isFavorite).map((a) => a.id))
  );
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const handleToggleFavorite = (activityId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(activityId)) {
        newFavorites.delete(activityId);
      } else {
        newFavorites.add(activityId);
      }
      return newFavorites;
    });
  };

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="h-5 w-5 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.size}</div>
            <p className="text-xs text-muted-foreground">
              Atividades que você mais gostou
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Atividades que você já fez
            </p>
          </CardContent>
        </Card>
        <div className="lg:col-span-2">
            <MotivationalMessage />
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Biblioteca de Atividades
          </CardTitle>
          <CardDescription>
            Explore, aprenda e divirta-se com nossas atividades!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar atividades por nome..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    isFavorite={favorites.has(activity.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onView={setSelectedActivity}
                  />
                ))}
              </div>
            </TabsContent>
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredActivities
                      .filter((act) => act.category === cat.name)
                      .map((activity) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          isFavorite={favorites.has(activity.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onView={setSelectedActivity}
                        />
                      ))}
                  </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <ActivityViewModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}
