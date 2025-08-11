
"use client";

import Image from "next/image";
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
import { type Activity } from "@/lib/mock-data";
import { X, Lock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";


interface ActivityViewModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  isLocked?: boolean;
}

export function ActivityViewModal({
  activity,
  isOpen,
  onClose,
  isLocked = false,
}: ActivityViewModalProps) {
  if (!activity) return null;

  const isPdfBlocked = isLocked && activity.pdfUrl !== '#';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0">
        <DialogHeader className="p-6 pb-0">
          <Badge variant="secondary" className="w-fit">{activity.category}</Badge>
          <DialogTitle className="text-2xl font-bold">{activity.title}</DialogTitle>
          <DialogDescription>
            {isPdfBlocked ? "Sua assinatura está inativa. Você pode visualizar a atividade, mas o acesso ao PDF está bloqueado." : "Visualize a atividade abaixo."}
          </DialogDescription>
        </DialogHeader>

        {isPdfBlocked && (
            <div className="px-6">
                <Alert variant="destructive" className="border-l-4">
                    <Lock className="h-5 w-5"/>
                    <AlertTitle>Conteúdo Bloqueado</AlertTitle>
                    <AlertDescription>
                        Para ter acesso ao material completo em PDF e a todas as outras atividades, você precisa de uma assinatura ativa.
                    </AlertDescription>
                </Alert>
            </div>
        )}

        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <Image
            unoptimized
            src={activity.thumbnailUrl.replace('400x250', '800x500')}
            alt={`Visualização da atividade ${activity.title}`}
            width={800}
            height={500}
            className={cn("w-full h-auto rounded-lg border object-contain", isPdfBlocked && "grayscale ")}
            data-ai-hint={activity.aiHint}
          />
        </div>
        <DialogFooter className="p-6 bg-muted/50 flex sm:justify-end items-center">
            <Button variant="ghost" onClick={onClose}>
                <X className="mr-2 h-4 w-4" /> Fechar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

