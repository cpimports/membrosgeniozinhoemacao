import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Gêniozinho em Ação',
  description: 'Uma plataforma divertida de atividades infantis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="min-h-screen flex flex-col bg-background">
          <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
              <Link href="/" className="flex items-center gap-2">
                <Image src="https://i.imgur.com/lWxj4DQ.png" alt="Gêniozinho em Ação Logo" width={32} height={32} className="h-8 w-8" />
                <span className="font-bold text-lg hidden sm:inline-block">Gêniozinho em Ação</span>
              </Link>
              <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="flex items-center space-x-2">
                  <div className="hidden md:block text-sm text-muted-foreground">
                    Olá! Vamos juntos tornar o aprendizado uma aventura?
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
