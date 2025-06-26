"use client";

import Image from 'next/image';
import { AlertTriangle, Gift } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PromoBlocks() {
  return (
    <div className="space-y-6 rounded-2xl border bg-[#FDA300] p-6 shadow-lg">
      <div className="w-full text-center">
          <AlertTitle 
            className="font-bold text-2xl mb-1 flex flex-col justify-center items-center gap-2 text-black"
            style={{ textShadow: '-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF' }}
          >
              <Gift className="h-8 w-8 text-red-600 [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.4))]" />
              Novas atividades disponíveis!
          </AlertTitle>
          <AlertDescription className="text-neutral-800">
              Aproveite para adquirir esses materiais extras e enriquecer ainda mais sua experiência com o Gêniozinho em Ação!
          </AlertDescription>
      </div>
      <Alert className="bg-white/80 border-yellow-950/40 text-yellow-900 [&>svg]:text-yellow-950 border-l-4">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="font-bold text-yellow-950">ATENÇÃO</AlertTitle>
        <AlertDescription className="text-yellow-900">
          Se você já adquiriu algum desses materiais, confira o e-mail cadastrado — o acesso já foi enviado para lá!
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Bloco 1: Moldes de EVA */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-xl lg:text-2xl font-bold text-primary flex items-center gap-3">
              <span className="text-3xl">✂️</span>
              <span className="leading-tight">+1000 moldes de EVA por apenas R$19,90!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 pt-0">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Ilustração de moldes de EVA com letras, animais e painéis"
              width={600}
              height={400}
              className="w-full h-52 object-cover rounded-lg border"
              data-ai-hint="eva craft molds"
            />
            <p className="text-card-foreground/90">
              Transforme suas atividades em verdadeiras obras de arte com moldes prontos para imprimir!
              Inclui temas como letras, animais, datas comemorativas, painéis escolares, personagens e muito mais!
            </p>
            <p className="flex items-center gap-3 text-sm text-muted-foreground font-semibold">
              <span className="text-2xl">🖨️</span>
              <span className="flex-1">Ideal para decorar salas, criar lembrancinhas e deixar suas aulas ainda mais criativas!</span>
            </p>
          </CardContent>
          <CardFooter className="bg-muted/40 p-4 mt-auto">
            <Label 
              htmlFor="eva-molds" 
              className="flex items-center justify-center space-x-3 w-full p-3 bg-accent hover:bg-accent/90 rounded-lg border-2 border-accent-foreground/30 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
               <Checkbox id="eva-molds" className="h-6 w-6 border-accent-foreground/50"/>
               <span className="text-base font-bold text-accent-foreground">
                Sim! Quero os +1000 moldes agora!
               </span>
            </Label>
          </CardFooter>
        </Card>

        {/* Bloco 2: Medalhas de Incentivo */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-xl lg:text-2xl font-bold text-primary flex items-center gap-3">
              <span className="text-3xl">🏅</span>
              <span className="leading-tight">Kit exclusivo com medalhas de incentivo por apenas R$7,00!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 pt-0">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Ilustração de medalhas de incentivo para alunos"
              width={600}
              height={400}
              className="w-full h-52 object-cover rounded-lg border"
              data-ai-hint="kids incentive medals"
            />
            <p className="text-card-foreground/90">
              Imprima e use para premiar os alunos por bom comportamento, participação e conquistas.
            </p>
            <p className="flex items-center gap-3 text-sm text-muted-foreground font-semibold">
              <span className="text-2xl">🎉</span>
              <span className="flex-1">Ajuda a motivar, valorizar o esforço e deixar as crianças ainda mais empolgadas para aprender!</span>
            </p>
          </CardContent>
          <CardFooter className="bg-muted/40 p-4 mt-auto">
             <Label 
              htmlFor="medals" 
              className="flex items-center justify-center space-x-3 w-full p-3 bg-accent hover:bg-accent/90 rounded-lg border-2 border-accent-foreground/30 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
               <Checkbox id="medals" className="h-6 w-6 border-accent-foreground/50"/>
               <span className="text-base font-bold text-accent-foreground">
                Sim! Quero as medalhas para premiar meus alunos!
               </span>
            </Label>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
