
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/lib/firebase";
import { addDays } from "date-fns";
import { ALL_PRODUCTS } from "@/lib/products";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  products: z.array(z.string()).refine(value => value.some(item => item), {
    message: "Você deve selecionar ao menos um produto.",
  }),
});


interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (newUser: any) => void;
}

export function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      products: [],
    },
  });

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // This is a temporary admin function to create a user. It should be handled by a secure backend in production.
    // We create a "dummy" user in Auth to get a UID, but we won't use the password.
    // The user will have to use the "forgot password" flow to set their own password.
    // NOTE: This is an admin-only function and relies on frontend access control, which is not perfectly secure.
    // A cloud function would be the robust way to handle this.
    try {
        const adminAuth = getAuth();
        
        // This is a workaround for the demo. We create a user with a random password that will be discarded.
        const tempPassword = Math.random().toString(36).slice(-8);
        const userCredential = await createUserWithEmailAndPassword(adminAuth, values.email, tempPassword);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        
        const newUserDoc = {
            uid: user.uid,
            name: values.name,
            email: values.email,
            products: values.products,
            subscription: {
              status: 'active',
              validUntil: Timestamp.fromDate(addDays(new Date(), 30)),
            },
            createdAt: Timestamp.now(),
        };

        await setDoc(userRef, newUserDoc);

        onUserAdded(newUserDoc);
        toast({
            title: "Usuário Adicionado!",
            description: `${values.name} foi adicionado com sucesso. Avise-o para usar 'Esqueceu a senha?' para o primeiro acesso.`,
        });
        form.reset();
        onClose();

    } catch (error: any) {
        console.error("Error creating user: ", error);
        let description = "Não foi possível criar o usuário. Tente novamente.";
        if(error.code === 'auth/email-already-in-use') {
            description = "Este e-mail já está em uso por outro usuário."
        }
        toast({
            title: "Erro ao criar usuário",
            description: description,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Crie uma conta para um cliente que comprou antes do sistema de webhook.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6 py-4">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                        <Input placeholder="Nome completo do cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email do Cliente</FormLabel>
                        <FormControl>
                        <Input placeholder="email@cliente.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="products"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Produtos Adquiridos</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                Selecione todos os produtos que este cliente comprou.
                            </p>
                        </div>
                        {ALL_PRODUCTS.map((item) => (
                            <FormField
                            key={item}
                            control={form.control}
                            name="products"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        {item}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => {form.reset(); onClose();}} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Salvando...' : 'Adicionar Usuário'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
