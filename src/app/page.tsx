"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityCard } from "@/components/activity-card";
import { ActivityViewModal } from "@/components/activity-view-modal";
import { activities, categories, type Activity } from "@/lib/mock-data";
import { Search, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

      {/* Promotional Blocks Section */}
      <div className="space-y-6">
        <div className="rounded-lg border-l-4 border-accent p-4 bg-accent/10">
          <div className="flex items-center">
            <TriangleAlert className="h-6 w-6 mr-3 text-accent flex-shrink-0" />
            <p className="text-sm font-semibold text-accent-foreground">
              ATENÇÃO: Se você já adquiriu algum desses materiais, confira o e-mail cadastrado — o acesso já foi enviado para lá!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* EVA Molds Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-2 border-primary/40 overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Moldes de EVA"
                width={600}
                height={300}
                className="w-full h-48 object-cover"
                data-ai-hint="eva molds craft"
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow space-y-4">
              <h3 className="text-xl font-bold text-primary">
                +1000 moldes de EVA por apenas R$19,90!
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transforme suas atividades em verdadeiras obras de arte com moldes prontos para imprimir! Inclui temas como letras, animais, datas comemorativas, painéis escolares, personagens e muito mais!
                <br />
                <span className="mt-2 inline-block">
                  🖨️ Ideal para decorar salas, criar lembrancinhas e deixar suas aulas ainda mais criativas!
                </span>
              </p>
            </CardContent>
            <CardFooter className="p-4 mt-auto bg-muted/50">
              <Label
                htmlFor="eva-molds"
                className="flex items-center space-x-3 w-full cursor-pointer rounded-lg bg-primary/10 p-4 transition-colors hover:bg-primary/20"
              >
                <Checkbox id="eva-molds" />
                <span className="text-base font-bold text-primary flex-1">
                  Sim! Quero os +1000 moldes agora!
                </span>
              </Label>
            </CardFooter>
          </Card>

          {/* Incentive Medals Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-2 border-accent/60 overflow-hidden">
            <CardHeader className="p-6 pb-2">
              <h3 className="text-xl font-bold text-accent-foreground">
                🏅 Kit exclusivo com medalhas de incentivo por apenas R$7,00!
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-2 flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Imprima e use para premiar os alunos por bom comportamento, participação e conquistas.
                <br />
                <span className="mt-2 inline-block">
                  🎉 Ajuda a motivar, valorizar o esforço e deixar as crianças ainda mais empolgadas para aprender!
                </span>
              </p>
            </CardContent>
            <CardFooter className="p-4 mt-auto bg-muted/50">
              <Label
                htmlFor="medals"
                className="flex items-center space-x-3 w-full cursor-pointer rounded-lg bg-primary/10 p-4 transition-colors hover:bg-primary/20"
              >
                <Checkbox id="medals" />
                <span className="text-base font-bold text-primary flex-1">
                  Sim! Quero as medalhas para premiar meus alunos!
                </span>
              </Label>
            </CardFooter>
          </Card>
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
