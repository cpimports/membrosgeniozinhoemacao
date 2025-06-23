"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would add your Firebase login logic
    console.log(values);
    toast({
      title: "Login realizado com sucesso!",
      description: "Redirecionando para o painel...",
    });
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
       <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="patt" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="hsl(var(--primary) / 0.2)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#patt)" />
        </svg>
      </div>
      <Card className="w-full max-w-md z-10 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto mb-2 flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
            <Image src="https://i.imgur.com/lWxj4DQ.png" alt="Geniuzinho em Ação Logo" width={48} height={48} className="h-12 w-12" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary-foreground" style={{color: 'hsl(var(--primary))'}}>Bem-vindo(a) de volta!</CardTitle>
          <CardDescription>Vamos brincar e aprender juntos.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seunome@email.com" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg h-12">Entrar</Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
            <p className="mt-2">
              <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                Esqueceu sua senha?
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
