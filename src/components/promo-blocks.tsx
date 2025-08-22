
"use client";

import Image from 'next/image';
import { Gift } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

export function PromoBlocks() {
  return (
    <div 
      className="space-y-6 rounded-2xl border bg-primary/10 p-6" 
      style={{ boxShadow: '8px 8px 0px hsla(var(--primary), 0.2)' }}
    >
      <div className="w-full text-center">
          <AlertTitle 
            className="font-bold text-2xl mb-1 flex flex-col justify-center items-center gap-2 text-primary"
          >
              <Gift className="h-8 w-8 text-accent" />
              Materiais de Bônus Disponíveis!
          </AlertTitle>
          <AlertDescription className="text-muted-foreground font-semibold">
              Adquira esses materiais extras e enriqueça ainda mais suas atividades!
          </AlertDescription>
      </div>
       <Alert className="bg-background/80 border-primary/20 text-primary-foreground text-center border-l-4 border-primary">
        <div className="flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
            <AlertTitle className="font-bold text-primary mt-0">
            ATENÇÃO
            </AlertTitle>
        </div>
        <AlertDescription className="text-muted-foreground text-center mt-1">
          Se você já adquiriu algum desses materiais, confira o e-mail cadastrado — o acesso já foi enviado para lá!
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Bloco 1: Moldes de EVA */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-xl lg:text-2xl font-bold text-secondary-foreground flex items-center gap-3">
              <span className="text-3xl">✂️</span>
              <span className="leading-tight">+1000 moldes de EVA por apenas R$19,90!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 pt-0">
            <Image
              unoptimized
              src="https://i.imgur.com/HCOg2Af.png"
              alt="Ilustração de moldes de EVA com letras, animais e painéis"
              width={600}
              height={400}
              className="w-full h-52 object-cover rounded-lg border"
              data-ai-hint="eva craft molds"
            />
            <p className="text-card-foreground/90">
                Transforme suas atividades em verdadeiras obras de arte com moldes prontos para imprimir! Inclui temas como letras, animais, datas comemorativas, painéis escolares, personagens e muito mais!
            </p>
            <p className="text-sm font-semibold text-secondary-foreground">
                🖨️ Ideal para decorar salas, criar lembrancinhas e deixar suas aulas ainda mais criativas!
            </p>
          </CardContent>
          <CardFooter className="bg-muted/40 p-4 mt-auto">
            <a href="https://pay.cakto.com.br/g3ufukf_468676" target="_blank" rel="noopener noreferrer" className="w-full">
              <Label
                className="flex items-center justify-center w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer animate-button-pulse transition-colors duration-300 text-base font-bold"
              >
                  Sim! Quero os +1000 moldes agora!
              </Label>
            </a>
          </CardFooter>
        </Card>

        {/* Bloco 2: Medalhas de Incentivo */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-xl lg:text-2xl font-bold text-secondary-foreground flex items-center gap-3">
              <span className="text-3xl">🏅</span>
              <span className="leading-tight">Kit exclusivo com medalhas de incentivo por apenas R$7,00!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-6 pt-0">
             <Image
              unoptimized
              src="https://i.imgur.com/QKYazo1.png"
              alt="Ilustração de medalhas de incentivo para alunos"
              width={600}
              height={400}
              className="w-full h-52 object-cover rounded-lg border"
              data-ai-hint="kids incentive medals"
            />
            <p className="text-card-foreground/90">
              Imprima e use para premiar os alunos por bom comportamento, participação e conquistas.
            </p>
            <p className="flex items-center gap-3 text-sm text-secondary-foreground font-semibold">
              <span className="text-2xl">🎉</span>
              <span className="flex-1">Ajuda a motivar, valorizar o esforço e deixar as crianças ainda mais empolgadas para aprender!</span>
            </p>
          </CardContent>
          <CardFooter className="bg-muted/40 p-4 mt-auto">
            <a href="https://pay.cakto.com.br/wi7akcn_468660" target="_blank" rel="noopener noreferrer" className="w-full">
              <Label
                className="flex items-center justify-center w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer animate-button-pulse transition-colors duration-300 text-base font-bold"
              >
                  Sim! Quero as medalhas para premiar meus alunos!
              </Label>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    