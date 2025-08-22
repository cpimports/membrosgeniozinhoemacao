
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function SecondaryPromoBlocks() {
  const secondaryProducts = [
    {
      title: "+150 Atividades Sensoriais - Foco e calma",
      image: "https://i.imgur.com/pupaV5i.png",
      link: "https://pay.cakto.com.br/wi7akcn_468660"
    },
    {
      title: "Cartões de Comunicação Visual (PECS)",
      image: "https://i.imgur.com/3jKKOSl.png",
      link: "https://pay.cakto.com.br/g3ufukf_468676"
    },
    {
      title: "Caderno Fonológico - Fala, Leitura e Atenção",
      image: "https://i.imgur.com/3erFsOG.png",
      link: "https://pay.cakto.com.br/3cuq9mw_538271"
    }
  ];

  return (
    <div className="space-y-6 rounded-2xl border bg-yellow-300/80 p-6 border-yellow-400">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-900">Atenção, você ainda não garantiu nossas Atividades Extras!</h2>
        <p className="text-yellow-800 font-semibold">Aproveite para adquirir esses materiais extras e enriquecer ainda mais sua experiência com o Gêniozinho em Ação!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {secondaryProducts.map((product) => (
          <Card key={product.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl bg-white">
            <CardHeader className="p-4">
              <CardTitle className="text-base font-bold text-center text-secondary-foreground leading-tight">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
              <Image
                unoptimized
                src={product.image}
                alt={`Imagem para ${product.title}`}
                width={400}
                height={400}
                className="w-full h-48 object-cover rounded-lg border"
              />
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 mt-auto">
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="w-full">
                <Label
                  className="flex items-center justify-center w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer animate-button-pulse transition-colors duration-300 text-base font-bold"
                >
                  Quero Adquirir!
                </Label>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    