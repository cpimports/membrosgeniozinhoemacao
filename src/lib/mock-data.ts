import { BookOpen, CalendarHeart, FlaskConical, Globe, Languages, Package, Scissors, Shapes, Smile } from "lucide-react";

export type Activity = {
  id: string;
  title: string;
  category: "Alfabetização" | "Matemática" | "Coordenação motora" | "Datas comemorativas" | "Educação emocional" | "Ciências" | "Geografia" | "Inglês" | "Pacotes Completos";
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
    { id: 'ciencias', name: 'Ciências', icon: FlaskConical },
    { id: 'geografia', name: 'Geografia', icon: Globe },
    { id: 'ingles', name: 'Inglês', icon: Languages },
    { id: 'pacotes', name: 'Pacotes Completos', icon: Package },
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
  { id: '12', title: 'Matemática', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18l9N86Y26RChn8M16RNZe0F6npa4yWjW', isFavorite: false, aiHint: 'math' },
  { id: '13', title: 'Ciências', category: 'Ciências', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1a1TsO_sVxfOaf6jwCr_ZBk6_tgS8j5Nm', isFavorite: false, aiHint: 'science experiment' },
  { id: '14', title: 'Geografia', category: 'Geografia', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1z6yTCx64YU0hapMAlvde3pjAXgKZ5dx4', isFavorite: false, aiHint: 'world map' },
  { id: '15', title: 'Inglês', category: 'Inglês', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1oRZLigZYIPQPKAQZWFWGSotcmF9_q9Nn', isFavorite: false, aiHint: 'learning english' },
  { id: '16', title: 'Todas as disciplinas - 2ºano', category: 'Pacotes Completos', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/16BakFM09KQ4E-qaJcqmU-bmuuKxNyjpy', isFavorite: false, aiHint: 'school subjects' },
  { id: '17', title: 'Vogais Fônicas', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Ylq98saTlody6Rse-rK67j0bh-caLR8T', isFavorite: false, aiHint: 'vowels phonics' },
  { id: '18', title: 'Vamos escrever', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1QpAQ6faz1eWcW2ue4e2k6f8Eeeq-iN2S', isFavorite: false, aiHint: 'writing practice' },
  { id: '19', title: 'Uno da leitura', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1rQniGYnUN_sT9bq57wcGFiUE9yw79BWw', isFavorite: false, aiHint: 'reading game' },
  { id: '20', title: 'Sorvetinho das contagens', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1i7mQLhtEMd-HkrU7helv9tODZjpBU-dx', isFavorite: false, aiHint: 'counting game' },
  { id: '21', title: 'Rotina', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1_8SFh8_redUcdLhXXeukbgVbSA0EqYQu', isFavorite: false, aiHint: 'daily routine' },
  { id: '22', title: 'Roleta das cores', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1SOXWU9WErST4ujfqDhG_eqnv2KQYnvNy', isFavorite: false, aiHint: 'color wheel' },
  { id: '23', title: 'Recorte e cole', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1tDGfVvxSARJHm7ZK23lXmE8LR57CETvC', isFavorite: false, aiHint: 'cut paste' },
  { id: '24', title: 'Quebra-cabeças', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1GaXxojfmBYf77wPYJIMqeP-2nHyi0GA1', isFavorite: false, aiHint: 'puzzle' },
  { id: '25', title: 'Que horas são', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1inGZVdf16B4G0VgnjyPUy4j2PAoEMUVD', isFavorite: false, aiHint: 'telling time' },
  { id: '26', title: 'Nome Próprio', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1KnZLIrj5lVWCFzidzwKz3icIYkRObHLi', isFavorite: false, aiHint: 'name writing' },
  { id: '27', title: 'Jogos para autista', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/14OlnLT2h3QwUCAD-kP6b-WEW0mvJYRW3', isFavorite: false, aiHint: 'autism games' },
  { id: '28', title: 'Jogo da memória', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1_F462SgMdKCvZXSBPDd7kUu7biRv7JmA', isFavorite: false, aiHint: 'memory game' },
  { id: '29', title: 'Interpretação de texto', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1mlpZtbw-bMmobRePp4ZTRavW74uZnMj3', isFavorite: false, aiHint: 'text interpretation' },
  { id: '30', title: 'Imitando os animais', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18G0TKYXblMC6F7XZwsojKlApx8dVuVPx', isFavorite: false, aiHint: 'animal imitation' },
  { id: '31', title: 'Historias', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1uqwk0ZTh5Xe9g8fLWpeCSfKP7nGir1_d', isFavorite: false, aiHint: 'story time' },
  { id: '32', title: 'Fluência leitora', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1hbv7gmSDPlYdAJvg65ucvpQ7SHIfaioh', isFavorite: false, aiHint: 'reading fluency' },
  { id: '33', title: 'Escrita maluca', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1MRdHra0aDU04PwIfQygjmxb1XrF1dooR', isFavorite: false, aiHint: 'creative writing' },
  { id: '34', title: 'Escreva as silabas', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1nkPv-pmbEC2QHDxEPl155-Pq34ex2Dkj', isFavorite: false, aiHint: 'writing syllables' },
  { id: '35', title: 'Emoções', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1CdeMcf2vTJZBnsZFgdMcBSldhZcEKgCd', isFavorite: false, aiHint: 'feelings chart' },
  { id: '36', title: 'Embaralhe as letras', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/155ka2G-Z5Qn5-0kawPdKHOB7dJZ62ZOI', isFavorite: false, aiHint: 'unscramble letters' },
  { id: '37', title: 'Dominós', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Q629gOLdWL-42ivNpdtaY5xrRjNdd2Vt', isFavorite: false, aiHint: 'dominoes game' },
  { id: '38', title: 'Dominó dos números', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Tj9eBlp1l53k4E0zL5QPOiuTCr5-zi-3', isFavorite: false, aiHint: 'number dominoes' },
  { id: '39', title: 'Dado Das Silabas', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/10ZFRqO09QFDhuTKICnBs3v1RRdUY-mxS', isFavorite: false, aiHint: 'syllable dice' },
  { id: '40', title: 'Dado das frases', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18d70i_VnA043TFVy8PIlE16CRBJwAcb9', isFavorite: false, aiHint: 'sentence dice' },
  { id: '42', title: 'Contando com os dedinhos', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'finger counting' },
  { id: '43', title: 'Cartões de Comunicação', category: 'Educação emocional', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'communication cards' },
  { id: '44', title: 'Bingos', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'bingo game' },
  { id: '45', title: 'Bingo das Palavras', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'word bingo' },
  { id: '46', title: 'Atividades sensoriais', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'sensory play' },
  { id: '47', title: 'Atividades de sequencias', category: 'Matemática', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'sequence activity' },
  { id: '48', title: 'Alinhavos', category: 'Coordenação motora', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'lacing cards' },
  { id: '49', title: 'Alimentação saudável', category: 'Ciências', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'healthy food' },
  { id: '50', title: 'Alfabeto das boquinhas', category: 'Alfabetização', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'mouth alphabet' },
  { id: '51', title: '+720 Atividades Escolares para Pré escola 1°, 2°, 3°, 4° e 5º ano', category: 'Pacotes Completos', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'school activities' },
  { id: '52', title: '+300 Atividades Bíblicas Infantil', category: 'Pacotes Completos', thumbnailUrl: 'https://placehold.co/400x250.png', pdfUrl: '#', isFavorite: false, aiHint: 'bible activities' },
];
