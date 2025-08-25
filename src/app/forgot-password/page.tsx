
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, ArrowLeft, AlertTriangle } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEmail(values.email);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setIsLinkSent(true);
      toast({
        title: "Link enviado!",
        description: "Verifique seu e-mail para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error(error);
      let description = "Não foi possível enviar o link. Verifique o e-mail e tente novamente.";
      if (error.code === 'auth/user-not-found') {
        description = "Nenhum usuário encontrado com este e-mail. Verifique se o e-mail está correto."
      }
      toast({
        title: "Erro ao enviar o link",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLinkSent) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
             <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">Verifique seu E-mail</CardTitle>
                     <CardDescription>
                       Enviamos um link de recuperação para <span className="font-semibold text-primary">{email}</span>. Clique nele para criar uma nova senha.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Alert variant="destructive">
                        <AlertTriangle className="h-5 w-5" />
                        <AlertTitle>Não recebeu o e-mail?</AlertTitle>
                        <AlertDescription>
                         Pode levar alguns minutos para chegar. Não se esqueça de checar sua <strong>caixa de SPAM</strong> ou lixo eletrônico.
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Recuperar Senha</CardTitle>
          <CardDescription>Digite seu e-mail para receber um link de redefinição.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Enviando...' : <> <Send className="mr-2"/> Enviar link de recuperação </>}
              </Button>
            </form>
          </Form>
        </CardContent>
         <CardFooter className="flex justify-center">
            <Link href="/login" passHref>
                <Button variant="link">
                    <ArrowLeft className="mr-2"/>
                    Lembrou a senha? Voltar para o Login
                </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
