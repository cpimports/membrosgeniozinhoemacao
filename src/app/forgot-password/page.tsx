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
import { Mail, Send, ArrowLeft } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      setIsSubmitted(true);
    } catch (error: any) {
       toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar o email de recuperação. Verifique o endereço e tente novamente.",
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
          <CardTitle className="text-3xl font-bold text-primary">Recuperar Senha</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "Um email de recuperação foi enviado para o endereço fornecido."
              : "Digite seu email para receber o link de recuperação."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-primary-foreground">
                Se o e-mail estiver cadastrado, você receberá as instruções em breve.
              </p>
            </div>
          ) : (
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
                  {isLoading ? 'Enviando...' : <> <Send className="mr-2"/> Enviar Link de Recuperação </>}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
             <Link href="/login" passHref>
                <Button variant="link" className="p-0 h-auto">
                  <ArrowLeft className="mr-2"/> Voltar para o Login
                </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
