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
  { id: '1', title: 'Sabe Ler - Autismo', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/SvaWc91.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/14qQNTkDYdEyBaJEROknqnEt0Imkg4XXr', isFavorite: true, aiHint: "child drawing" },
  { id: '2', title: 'Não Sabe Ler - Autismo', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/YmcoxnN.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1b-b9IpMcNdMqDWxktQlw_As4C1gUf1V1', isFavorite: false, aiHint: "child pointing" },
  { id: '3', title: 'Números', category: 'Coordenação motora', thumbnailUrl: 'https://i.imgur.com/bYZblCi.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1l1pZ7p6-RZQoS4ozo8OwH88-T5EeF7Jo', isFavorite: false, aiHint: "cutting shapes" },
  { id: '4', title: 'Os 5 Sentidos', category: 'Datas comemorativas', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: true, aiHint: "five senses" },
  { id: '5', title: 'O Monstrinho das Emoções', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "emotions monster" },
  { id: '6', title: 'Labirinto das Vogais', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "vowel maze" },
  { id: '7', title: 'Soma Simples com Blocos', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "simple sum" },
  { id: '8', title: 'Traçando o Caminho da Joaninha', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: true, aiHint: "tracing lines" },
  { id: '9', title: 'Máscara de Carnaval para Montar', category: 'Datas comemorativas', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "carnival mask" },
  { id: '10', title: 'Roda da Gratidão', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "gratitude wheel" },
  { id: '11', title: 'Caça-palavras de Objetos', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "word search" },
  { id: '12', title: 'Quebra-cabeça numérico', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: "number puzzle" },
];
