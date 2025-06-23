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
import { Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityViewModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityViewModal({
  activity,
  isOpen,
  onClose,
}: ActivityViewModalProps) {
  const { toast } = useToast();

  if (!activity) return null;

  const handleDownload = () => {
    // This would trigger a download from Firebase Storage
    toast({
      title: "Download iniciado!",
      description: `Baixando a atividade "${activity.title}".`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0">
        <DialogHeader className="p-6 pb-0">
          <Badge variant="secondary" className="w-fit">{activity.category}</Badge>
          <DialogTitle className="text-2xl font-bold">{activity.title}</DialogTitle>
          <DialogDescription>
            Visualize a atividade abaixo. Você pode baixá-la em PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <Image
            src={activity.thumbnailUrl.replace('400x250', '800x500')}
            alt={`Visualização da atividade ${activity.title}`}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg border object-contain"
            data-ai-hint={activity.aiHint}
          />
        </div>
        <DialogFooter className="p-6 bg-muted/50 flex sm:justify-between items-center">
            <Button variant="ghost" onClick={onClose}>
                <X className="mr-2 h-4 w-4" /> Fechar
            </Button>
            <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Baixar PDF
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
