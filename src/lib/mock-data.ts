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
  { id: '4', title: 'Os 5 Sentidos', category: 'Datas comemorativas', thumbnailUrl: 'https://i.imgur.com/oRjjmWE.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/13MoFL5zqccABp1IsXaOm8LVk8N47e_Y_', isFavorite: true, aiHint: "five senses" },
  { id: '5', title: 'Formas Geométricas', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1kWWJU3fIVzuuXNgk9hx4UKhBUup-LBwq', isFavorite: false, aiHint: "geometric shapes" },
  { id: '6', title: 'Dia da Árvore', category: 'Datas comemorativas', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1O4K0z-tNU87n8VfZL0iZ5OulwiLf4Ovr', isFavorite: false, aiHint: "tree day" },
  { id: '7', title: 'Coordenação Motora', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Aoe90oiFQ0f8jpowYh0DR_S_olmf0dRQ', isFavorite: false, aiHint: "motor skills" },
  { id: '8', title: 'Caligrafia', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1MQJbnDiYW1w0SjrzGRYokFDwRT_DAWnU', isFavorite: true, aiHint: "tracing lines" },
  { id: '9', title: 'Adivinhe o que é', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1iMkAFLHQn7c7BvELxofO8Nt4jy6ZwM_z', isFavorite: false, aiHint: "riddle" },
  { id: '10', title: 'Atividades Sensoriais', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1oBgVLL4c6oUOSXPT3m3Vm_Oxv1v5opIi', isFavorite: false, aiHint: "sensory activities" },
  { id: '11', title: 'Cores', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1mqrM_wj2xlgUAPRgWyUrw36WFT7yXebl', isFavorite: false, aiHint: "colors" },
  { id: '12', title: 'Matemática', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18l9N86Y26RChn8M16RNZe0F6npa4yWjW', isFavorite: false, aiHint: "math" },
];
