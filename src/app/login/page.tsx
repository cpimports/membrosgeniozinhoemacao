"use client";

import { useState } from "react";
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
import { Mail, KeyRound, LogIn } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o painel...",
      });
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro ao tentar fazer login.";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Usuário não encontrado. Verifique o e-mail e tente novamente.";
          break;
        case "auth/wrong-password":
          errorMessage = "Senha incorreta. Por favor, tente novamente.";
          break;
        case "auth/invalid-credential":
           errorMessage = "Credenciais inválidas. Verifique seu e-mail e senha.";
           break;
        default:
          errorMessage = "Ocorreu um erro desconhecido. Tente novamente mais tarde.";
          break;
      }
       toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-card/80">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Bem-vindo(a) de volta!</CardTitle>
          <CardDescription>Acesse sua conta para continuar.</CardDescription>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                     <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : <> <LogIn className="mr-2"/> Entrar </>}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Link href="/forgot-password" passHref>
                <Button variant="link" size="sm" className="text-sm">
                    Esqueceu sua senha?
                </Button>
            </Link>
             <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/signup" passHref>
                    <Button variant="link" className="p-0 h-auto">
                    Cadastre-se
                    </Button>
                </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
