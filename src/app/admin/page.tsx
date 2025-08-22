
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ManageUserModal, type UserData } from '@/components/manage-user-modal';
import { AddUserModal } from '@/components/add-user-modal';

export default function AdminPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const isAdmin = user?.email === 'admin@gmail.com';
  
  const fetchUsers = useCallback(async () => {
      setLoadingUsers(true);
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
      } finally {
        setLoadingUsers(false);
      }
    }, []);

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

    if(isAdmin) {
        fetchUsers();
    }
  }, [user, loadingAuth, isAdmin, router, fetchUsers]);

  const handleManageClick = (userToManage: UserData) => {
    setSelectedUser(userToManage);
  };

  const handleCloseManageModal = () => {
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser: UserData) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    fetchUsers(); // Re-fetch to ensure data is consistent
  };
  
  const handleUserAdded = (newUser: UserData) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    fetchUsers(); // Re-fetch to get the full list with the new user
  };


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
    <>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Lista de Usuários</CardTitle>
                    <CardDescription>
                       Aqui você pode visualizar todos os usuários cadastrados na plataforma.
                    </CardDescription>
                </div>
                <Button onClick={() => setIsAddUserModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Usuário
                </Button>
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
                                          <Button variant="outline" size="sm" onClick={() => handleManageClick(u)}>Gerenciar</Button>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  )}
              </CardContent>
          </Card>
      </div>
      
      <ManageUserModal
        isOpen={!!selectedUser}
        onClose={handleCloseManageModal}
        user={selectedUser}
        onUserUpdate={handleUserUpdate}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </>
  );
}
