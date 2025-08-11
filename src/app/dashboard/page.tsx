"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
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
import { Search, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { PromoBlocks } from "@/components/promo-blocks";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";
import { AIRecommender } from "@/components/ai-recommender";

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const isAdmin = user?.email === 'admin';

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

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

  if (loading || !user) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Olá, {user.displayName || 'Gêniozinho'}!</h1>
          <p className="text-muted-foreground">Bem-vindo(a) de volta!</p>
        </div>
        <div className="flex items-center gap-2">
            {isAdmin && (
                <Button variant="secondary" onClick={() => router.push('/admin')}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Painel Admin
                </Button>
            )}
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex-grow">
              <h3 className="text-base font-semibold text-primary">Junte-se à nossa comunidade exclusiva de pais e professores!</h3>
              <p className="mt-1 text-sm text-foreground">
                Receba conteúdos especiais, dicas práticas e novidades em primeira mão.
                Clique no botão abaixo e participe do nosso grupo VIP no WhatsApp!
              </p>
            </div>
            <Button asChild className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto" size="lg" style={{ backgroundColor: '#25D366', color: 'white' }}>
              <a href="https://chat.whatsapp.com/ETxeF3IfwBU9JUjsDZRSkH" target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="mr-2 h-5 w-5" />
                Entrar no Grupo VIP
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AIRecommender onActivityClick={handleViewActivity} />

      <PromoBlocks />

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
