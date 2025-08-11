"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isAdmin = user?.email === 'admin@gmail.com';

  useEffect(() => {
    if (loading) {
      return; 
    }
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-40 w-full" />
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-primary">Painel do Administrador</h1>
                <p className="text-muted-foreground">Gerencie usuários, produtos e assinaturas.</p>
            </div>
            <Button onClick={() => router.push('/dashboard')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Bem-vindo, Admin!</CardTitle>
                <CardDescription>
                    Esta é a sua área para gerenciar o conteúdo e os usuários da plataforma. Em breve, você poderá visualizar todos os usuários, gerenciar seus produtos e assinaturas aqui.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>O próximo passo será listar todos os usuários do sistema aqui.</p>
            </CardContent>
        </Card>
    </div>
  );
}
