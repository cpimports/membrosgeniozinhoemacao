
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
import { Package } from "lucide-react";

export type UserData = {
  id: string;
  name: string;
  email: string;
  products?: string[];
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
            // If subscription is already active and has a future date, don't extend it.
            // Extend only if it was inactive or expired.
            const currentValidUntil = user.subscription.validUntil?.toDate();
            if (!currentValidUntil || currentValidUntil < new Date()) {
                 validUntil = Timestamp.fromDate(addDays(new Date(), 30));
            } else {
                validUntil = user.subscription.validUntil;
            }
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
          <div className="space-y-1.5">
              <Label>Nome</Label>
              <p className="text-sm text-muted-foreground">{user.name}</p>
          </div>
           <div className="space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          
          <div className="space-y-3">
            <Label>Produtos Adquiridos</Label>
            <div className="p-3 rounded-lg border bg-muted/50 space-y-2">
                {user.products && user.products.length > 0 ? (
                    user.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="h-4 w-4" />
                            <span>{product}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground italic">Nenhum produto adquirido.</p>
                )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <Label htmlFor="subscription-status">Assinatura</Label>
                <p className="text-xs text-muted-foreground">
                    Ative ou desative o acesso geral do usuário.
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

