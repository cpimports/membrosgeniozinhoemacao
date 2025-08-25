
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function ForgotPasswordPage() {
    return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
             <Card className="w-full max-w-lg shadow-2xl backdrop-blur-lg bg-card/80">
                <CardHeader className="text-center">
                    <Construction className="h-12 w-12 mx-auto text-primary" />
                    <CardTitle className="text-3xl font-bold text-primary mt-4">Página em Manutenção</CardTitle>
                     <CardDescription>
                       A opção de redefinir a senha por e-mail está temporariamente desativada.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Alert variant="destructive">
                        <AlertTitle>Problemas com a senha?</AlertTitle>
                        <AlertDescription>
                         Sua senha inicial é o seu <strong>CPF (somente números)</strong>, utilizado no momento da compra. Se ainda assim não conseguir acessar, por favor, entre em contato com nosso suporte.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                 <CardFooter className="flex flex-col gap-4">
                    <Link href="/login" passHref>
                        <Button>
                          <ArrowLeft className="mr-2" />
                          Voltar para o Login
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
