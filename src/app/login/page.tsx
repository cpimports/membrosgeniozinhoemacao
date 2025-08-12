
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, LogIn, KeyRound } from "lucide-react";
import { signInWithEmailAndPassword, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isLoggingInFromLink, setIsLoggingInFromLink] = useState(false);

  // Check if the user is coming from a sign-in link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsLoggingInFromLink(true);
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the email again. For simplicity,
        // we'll just ask them to start over.
        toast({
          title: "Erro de verificação",
          description: "Por favor, digite seu e-mail novamente para fazer login.",
          variant: "destructive",
        });
        setIsLoggingInFromLink(false);
        return;
      }
      
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo(a) de volta!",
          });
          router.push("/dashboard");
        })
        .catch((err) => {
          toast({
            title: "Erro ao fazer login",
            description: "O link de acesso é inválido ou expirou. Por favor, tente novamente.",
            variant: "destructive",
          });
           setIsLoggingInFromLink(false);
        });
    }
  }, [router, toast]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const actionCodeSettings = {
        url: window.location.href, // This URL will be used to complete the sign-in.
        handleCodeInApp: true,
    };

    try {
        await sendSignInLinkToEmail(auth, values.email, actionCodeSettings);
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', values.email);
        setIsLinkSent(true);
        toast({
            title: "Link de acesso enviado!",
            description: "Verifique seu e-mail para o link mágico de login.",
        });
    } catch (error: any) {
        console.error(error);
        toast({
            title: "Erro ao enviar o link",
            description: "Não foi possível enviar o link de acesso. Verifique o e-mail e tente novamente.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  if (isLoggingInFromLink) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
             <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">Verificando...</CardTitle>
                    <CardDescription>Aguarde enquanto validamos seu link de acesso.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (isLinkSent) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
             <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">Verifique seu E-mail</CardTitle>
                     <CardDescription>
                       Enviamos um link mágico para o seu e-mail. Clique nele para acessar sua conta!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Alert>
                        <Mail className="h-5 w-5" />
                        <AlertTitle>Link enviado!</AlertTitle>
                        <AlertDescription>
                         Pode levar alguns minutos para chegar. Não se esqueça de checar sua caixa de spam.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                 <CardFooter className="flex flex-col gap-4">
                    <Button variant="link" onClick={() => setIsLinkSent(false)}>
                        Não recebeu? Enviar novamente.
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Bem-vindo(a)!</CardTitle>
          <CardDescription>Digite seu e-mail para acessar sua conta.</CardDescription>
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
                {isLoading ? 'Enviando link...' : <> <LogIn className="mr-2"/> Receber link de acesso </>}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
             <div className="text-center text-sm text-muted-foreground">
                O acesso é liberado após a compra. <br/> Você receberá um link de login no e-mail cadastrado.
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

    