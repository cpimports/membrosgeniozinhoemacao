"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { addDays } from 'date-fns';

export type UserData = {
  id: string;
  name: string;
  email: string;
  subscription: {
    status: string;
    validUntil: any;
  };
};

interface ManageUserModalProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: (updatedUser: UserData) => void;
}

export function ManageUserModal({
  user,
  isOpen,
  onClose,
  onUserUpdate,
}: ManageUserModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (user) {
      setIsActive(user.subscription?.status === 'active');
    }
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
        const userRef = doc(db, "users", user.id);
        const newStatus = isActive ? 'active' : 'inactive';
        
        let validUntil = null;
        if (isActive) {
            validUntil = Timestamp.fromDate(addDays(new Date(), 30));
        }

        const updatedData = {
            'subscription.status': newStatus,
            'subscription.validUntil': validUntil,
        };

        await updateDoc(userRef, updatedData);

        onUserUpdate({
            ...user,
            subscription: {
                status: newStatus,
                validUntil: validUntil,
            },
        });

        toast({
            title: "Usuário atualizado!",
            description: `A assinatura de ${user.name} foi alterada.`,
        });
        onClose();

    } catch (error) {
        console.error("Error updating user: ", error);
        toast({
            title: "Erro ao atualizar",
            description: "Não foi possível salvar as alterações. Tente novamente.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar Usuário</DialogTitle>
          <DialogDescription>
            Altere as informações e permissões do usuário.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="flex flex-col space-y-1.5">
              <Label>Nome</Label>
              <p className="text-sm text-muted-foreground">{user.name}</p>
          </div>
           <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <Label htmlFor="subscription-status">Assinatura</Label>
                <p className="text-xs text-muted-foreground">
                    Ative ou desative a assinatura deste usuário.
                </p>
            </div>
             <div className="flex items-center gap-2">
                <Switch
                    id="subscription-status"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    disabled={isSubmitting}
                />
                <Badge variant={isActive ? 'default' : 'secondary'}>
                    {isActive ? 'Ativa' : 'Inativa'}
                </Badge>
             </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
