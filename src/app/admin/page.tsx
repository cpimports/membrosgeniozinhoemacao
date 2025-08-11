"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type UserData = {
    id: string;
    name: string;
    email: string;
    subscription: {
        status: string;
        validUntil: any;
    };
}

export default function AdminPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const isAdmin = user?.email === 'admin@gmail.com';

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const usersList = userSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        } as UserData));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
        // Handle error display to user
      } finally {
        setLoadingUsers(false);
      }
    };

    if(isAdmin) {
        fetchUsers();
    }
  }, [user, loadingAuth, isAdmin, router]);

  const renderSkeletons = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loadingAuth || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 w-full max-w-4xl">
            {renderSkeletons()}
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
                <CardTitle>Lista de Usuários</CardTitle>
                <CardDescription>
                   Aqui você pode visualizar todos os usuários cadastrados na plataforma.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loadingUsers ? (
                   <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status da Assinatura</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={u.subscription?.status === 'active' ? 'default' : 'secondary'}>
                                            {u.subscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Gerenciar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
