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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

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
    // Placeholder for save logic
    console.log("Saving changes...");
    onClose();
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
        <div className="py-4 space-y-4">
          <div className="flex flex-col space-y-1.5">
              <Label>Nome</Label>
              <p className="text-sm text-muted-foreground">{user.name}</p>
          </div>
           <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="subscription-status">Assinatura Ativa</Label>
             <Badge variant={isActive ? 'default' : 'secondary'}>
                {isActive ? 'Ativa' : 'Inativa'}
            </Badge>
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
