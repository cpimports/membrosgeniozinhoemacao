"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gradient-to-br from-background to-secondary/50 p-4">
      <div className="text-center space-y-8">
        <Image
          src="https://i.imgur.com/29Kp6BM.png"
          alt="Gêniozinho em Ação Logo"
          width={150}
          height={150}
          className="mx-auto w-40 h-auto"
          data-ai-hint="logo"
          unoptimized
        />
        <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary tracking-tight">Gêniozinho em Ação</h1>
            <p className="text-lg text-muted-foreground">Sua plataforma de atividades infantis para aprender e se divertir!</p>
        </div>

        <Card className="w-full max-w-sm mx-auto shadow-xl bg-card/80 backdrop-blur-lg">
            <CardHeader>
                <CardTitle>Acesse sua conta</CardTitle>
                <CardDescription>Entre ou crie uma conta para acessar todas as nossas atividades.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                 <Link href="/login" passHref>
                    <Button className="w-full" size="lg">
                        <LogIn className="mr-2"/>
                        Fazer Login
                    </Button>
                </Link>
                <Link href="/signup" passHref>
                    <Button className="w-full" size="lg" variant="secondary">
                        <UserPlus className="mr-2"/>
                        Criar Conta
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
