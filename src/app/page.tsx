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
import { activities, categories, type Activity } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const handleViewActivity = (activity: Activity) => {
    if (activity.pdfUrl && activity.pdfUrl !== '#') {
      window.open(activity.pdfUrl, '_blank');
    } else {
      setSelectedActivity(activity);
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="https://i.imgur.com/29Kp6BM.png"
          alt="Gêniozinho em Ação Logo"
          width={120}
          height={120}
          className="mx-auto mb-4 w-30 h-auto"
          data-ai-hint="logo"
        />
        <h1 className="text-3xl font-bold text-primary">Seja bem-vindo(a) ao Gêniozinho em Ação!</h1>
        <p className="text-muted-foreground mt-1">Um mundo onde brincar ensina e aprender encanta!</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex-grow">
              <h3 className="text-base font-semibold text-primary">Junte-se à nossa comunidade exclusiva de pais e professores!</h3>
              <p className="mt-1 text-sm">
                Receba conteúdos especiais, dicas práticas e novidades em primeira mão.
                Clique no botão abaixo e participe do nosso grupo VIP no WhatsApp!
              </p>
            </div>
            <Button asChild className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto" size="lg" style={{ backgroundColor: '#25D366', color: 'white' }}>
              <a href="https://chat.whatsapp.com/replace-with-your-invite-link" target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="mr-2 h-5 w-5" />
                Entrar no Grupo VIP
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>


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
            <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onView={handleViewActivity}
                  />
                ))}
              </div>
            </TabsContent>
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActivities
                      .filter((act) => act.category === cat.name)
                      .map((activity) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          onView={handleViewActivity}
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
