import { BookOpen, CalendarHeart, Scissors, Shapes, Smile } from "lucide-react";

export type Activity = {
  id: string;
  title: string;
  category: "Alfabetização" | "Matemática" | "Coordenação motora" | "Datas comemorativas" | "Educação emocional";
  thumbnailUrl: string;
  pdfUrl: string;
  isFavorite: boolean;
  aiHint: string;
};

export const categories = [
    { id: 'alfabetizacao', name: 'Alfabetização', icon: BookOpen },
    { id: 'matematica', name: 'Matemática', icon: Shapes },
    { id: 'coordenacao', name: 'Coordenação motora', icon: Scissors },
    { id: 'datas', name: 'Datas comemorativas', icon: CalendarHeart },
    { id: 'emocional', name: 'Educação emocional', icon: Smile },
] as const;


export const activities: Activity[] = [
  { id: '1', title: 'Sabe Ler - Autismo', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/lWxj4DQ.png', pdfUrl: '#', isFavorite: true, aiHint: "alphabet animals" },
  { id: '2', title: 'Contando com Frutinhas Coloridas', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "counting fruits" },
  { id: '3', title: 'Recortando Formas Geométricas', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "cutting shapes" },
  { id: '4', title: 'Colorindo o Saci para o Folclore', category: 'Datas comemorativas', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: true, aiHint: "brazilian folklore" },
  { id: '5', title: 'O Monstrinho das Emoções', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "emotions monster" },
  { id: '6', title: 'Labirinto das Vogais', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "vowel maze" },
  { id: '7', title: 'Soma Simples com Blocos', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "simple sum" },
  { id: '8', title: 'Traçando o Caminho da Joaninha', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: true, aiHint: "tracing lines" },
  { id: '9', title: 'Máscara de Carnaval para Montar', category: 'Datas comemorativas', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "carnival mask" },
  { id: '10', title: 'Roda da Gratidão', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "gratitude wheel" },
  { id: '11', title: 'Caça-palavras de Objetos', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "word search" },
  { id: '12', title: 'Quebra-cabeça numérico', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "number puzzle" },
];
