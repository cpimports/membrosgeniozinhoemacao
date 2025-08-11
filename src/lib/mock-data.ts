import { BookOpen, Gamepad2, Package, Scissors, Shapes } from "lucide-react";

export type Activity = {
  id: string;
  title: string;
  category: "Alfabetização" | "Números" | "Atividades sensoriais" | "Ensino Completo" | "Jogos Educativos";
  thumbnailUrl: string;
  pdfUrl: string;
  isFavorite: boolean;
  aiHint: string;
};

export const categories = [
    { id: 'alfabetizacao', name: 'Alfabetização', icon: BookOpen },
    { id: 'numeros', name: 'Números', icon: Shapes },
    { id: 'sensoriais', name: 'Atividades sensoriais', icon: Scissors },
    { id: 'ensino-completo', name: 'Ensino Completo', icon: Package },
    { id: 'jogos-educativos', name: 'Jogos Educativos', icon: Gamepad2 },
] as const;


export const activities: Activity[] = [
  { id: '54', title: 'Pareamento Visual e Coordenação Motora – Guarda-Chuvas Coloridos', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/Y8Tg4ns.png', pdfUrl: 'https://drive.google.com/drive/u/3/folders/1ZlfFJXHrBLBbhoFFI2Eyxfuo1EyCVmN_', isFavorite: false, aiHint: "visual pairing" },
  { id: '53', title: 'Coordenação Ritmada', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/oRWVIpu.png', pdfUrl: 'https://drive.google.com/drive/u/3/folders/1Parc_g0dzE9iDRWmaMa7aAoxgbe2VLun', isFavorite: false, aiHint: "rhythmic coordination" },
  { id: '1', title: 'Sabe Ler - Autismo', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/SvaWc91.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/14qQNTkDYdEyBaJEROknqnEt0Imkg4XXr', isFavorite: true, aiHint: "child drawing" },
  { id: '2', title: 'Não Sabe Ler - Autismo', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/YmcoxnN.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1b-b9IpMcNdMqDWxktQlw_As4C1gUf1V1', isFavorite: false, aiHint: "child pointing" },
  { id: '18', title: 'Vamos escrever', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/vhEaEg6.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1QpAQ6faz1eWcW2ue4e2k6f8Eeeq-iN2S', isFavorite: false, aiHint: 'writing practice' },
  { id: '19', title: 'Uno da leitura', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/OKwmJd8.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1rQniGYnUN_sT9bq57wcGFiUE9yw79BWw', isFavorite: false, aiHint: 'reading game' },
  { id: '26', title: 'Nome Próprio', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/1MVMlOW.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1KnZLIrj5lVWCFzidzwKz3icIYkRObHLi', isFavorite: false, aiHint: 'name writing' },
  { id: '8', title: 'Caligrafia', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/tRpQRss.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1MQJbnDiYW1w0SjrzGRYokFDwRT_DAWnU', isFavorite: true, aiHint: "tracing lines" },
  { id: '34', title: 'Escreva as silabas', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/aDFuER0.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1nkPv-pmbEC2QHDxEPl155-Pq34ex2Dkj', isFavorite: false, aiHint: 'writing syllables' },
  { id: '33', title: 'Escrita maluca', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/Q71cI03.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1MRdHra0aDU04PwIfQygjmxb1XrF1dooR', isFavorite: false, aiHint: 'creative writing' },
  { id: '32', title: 'Fluência leitora', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/AObZwIN.png', pdfUrl: 'https://drive.gdrive.google.com/drive/u/4/folders/1hbv7gmSDPlYdAJvg65ucvpQ7SHIfaioh', isFavorite: false, aiHint: 'reading fluency' },
  { id: '17', title: 'Vogais Fônicas', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/52IlwNO.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Ylq98saTlody6Rse-rK67j0bh-caLR8T', isFavorite: false, aiHint: 'vowels phonics' },
  { id: '29', title: 'Interpretação de texto', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/6hpNx9P.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1mlpZtbw-bMmobRePp4ZTRavW74uZnMj3', isFavorite: false, aiHint: 'text interpretation' },
  { id: '15', title: 'Inglês', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/nvIxMfQ.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1oRZLigZYIPQPKAQZWFWGSotcmF9_q9Nn', isFavorite: false, aiHint: 'learning english' },
  { id: '25', title: 'Que horas são', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/GfrBAXF.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1inGZVdf16B4G0VgnjyPUy4j2PAoEMUVD', isFavorite: false, aiHint: 'telling time' },
  { id: '31', title: 'Historias', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/pMrrMPw.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1uqwk0ZTh5Xe9g8fLWpeCSfKP7nGir1_d', isFavorite: false, aiHint: 'story time' },
  { id: '36', title: 'Embaralhe as letras', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/fzBH8d8.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/155ka2G-Z5Qn5-0kawPdKHOB7dJZ62ZOI', isFavorite: false, aiHint: 'unscramble letters' },
  { id: '40', title: 'Dado das frases', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/ymR2MCW.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18d70i_VnA043TFVy8PIlE16CRBJwAcb9', isFavorite: false, aiHint: 'sentence dice' },
  { id: '39', title: 'Dado Das Silabas', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/FaCXj4X.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/10ZFRqO09QFDhuTKICnBs3v1RRdUY-mxS', isFavorite: false, aiHint: 'syllable dice' },
  { id: '45', title: 'Bingo das Palavras', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/RpNv5Du.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1wQoSTPOrUtNUbQqc_FjpKxge4XOBlWr3', isFavorite: false, aiHint: 'word bingo' },
  { id: '50', title: 'Alfabeto das boquinhas', category: 'Alfabetização', thumbnailUrl: 'https://i.imgur.com/QnaQlOr.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/12JHT9ez2-C56hdZLHnx5ygMu7VIylJv7', isFavorite: false, aiHint: 'mouth alphabet' },

  { id: '3', title: 'Números', category: 'Números', thumbnailUrl: 'https://i.imgur.com/bYZblCi.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1l1pZ7p6-RZQoS4ozo8OwH88-T5EeF7Jo', isFavorite: false, aiHint: "cutting shapes" },
  { id: '5', title: 'Formas Geométricas', category: 'Números', thumbnailUrl: 'https://i.imgur.com/W4FXEcV.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1kWWJU3fIVzuuXNgk9hx4UKhBUup-LBwq', isFavorite: false, aiHint: "geometric shapes" },
  { id: '12', title: 'Matemática', category: 'Números', thumbnailUrl: 'https://i.imgur.com/pv3u289.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18l9N86Y26RChn8M16RNZe0F6npa4yWjW', isFavorite: false, aiHint: 'math' },
  { id: '20', title: 'Sorvetinho das contagens', category: 'Números', thumbnailUrl: 'https://i.imgur.com/6rxsUJ2.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1i7mQLhtEMd-HkrU7helv9tODZjpBU-dx', isFavorite: false, aiHint: 'counting game' },
  { id: '38', title: 'Dominó dos números', category: 'Números', thumbnailUrl: 'https://i.imgur.com/9Y4bFSe.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Tj9eBlp1l53k4E0zL5QPOiuTCr5-zi-3', isFavorite: false, aiHint: 'number dominoes' },
  { id: '42', title: 'Somando com os dedinhos', category: 'Números', thumbnailUrl: 'https://i.imgur.com/2Pu9SEt.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1JopL1v99qFiXKOacsu0hMNs__vqSMjRT', isFavorite: false, aiHint: 'finger counting' },
  { id: '11', title: 'Cores', category: 'Números', thumbnailUrl: 'https://i.imgur.com/WI1Sjgj.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1mqrM_wj2xlgUAPRgWyUrw36WFT7yXebl', isFavorite: false, aiHint: "colors" },

  { id: '7', title: 'Coordenação Motora', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/419fs74.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Aoe90oiFQ0f8jpowYh0DR_S_olmf0dRQ', isFavorite: false, aiHint: "motor skills" },
  { id: '10', title: 'Atividades Sensoriais', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/KRm2MX1.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1oBgVLL4c6oUOSXPT3m3Vm_Oxv1v5opIi', isFavorite: false, aiHint: "sensory activities" },
  { id: '23', title: 'Recorte e cole', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/vDYHc73.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1tDGfVvxSARJHm7ZK23lXmE8LR57CETvC', isFavorite: false, aiHint: 'cut paste' },
  { id: '30', title: 'Imitando os animais', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/pj02GHT.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/18G0TKYXblMC6F7XZwsojKlApx8dVuVPx', isFavorite: false, aiHint: 'animal imitation' },
  { id: '46', title: 'Atividades sensoriais', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/ErTB6MF.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1tkNga3m9HaF-OTRa9qaleM1Agb3xSulT', isFavorite: false, aiHint: 'sensory play' },
  { id: '48', title: 'Alinhavos', category: 'Atividades sensoriais', thumbnailUrl: 'https://i.imgur.com/vvB2ZPB.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1vgV_nc1pQ7VJiAGYlcqyeWh0qs5CXQLZ', isFavorite: false, aiHint: 'lacing cards' },

  { id: '4', title: 'Os 5 Sentidos', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/oRjjmWE.jpeg', pdfUrl: 'https://drive.google.com/drive/u/4/folders/13MoFL5zqccABp1IsXaOm8LVk8N47e_Y_', isFavorite: true, aiHint: "five senses" },
  { id: '6', title: 'Dia da Árvore', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/O4bMEIn.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1O4K0z-tNU87n8VfZL0iZ5OulwiLf4Ovr', isFavorite: false, aiHint: "tree day" },
  { id: '13', title: 'Ciências', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/ADDRu1R.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1a1TsO_sVxfOaf6jwCr_ZBk6_tgS8j5Nm', isFavorite: false, aiHint: 'science experiment' },
  { id: '14', title: 'Geografia', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/1PxTzcr.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1z6yTCx64YU0hapMAlvde3pjAXgKZ5dx4', isFavorite: false, aiHint: 'world map' },
  { id: '16', title: 'Todas as disciplinas - 2ºano', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/t533RG8.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/16BakFM09KQ4E-qaJcqmU-bmuuKxNyjpy', isFavorite: false, aiHint: 'school subjects' },
  { id: '47', title: 'Atividades de sequencias', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/OIab9X8.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1shbn3wR01vXU4e0H4HQFPg4tQxUBll7P', isFavorite: false, aiHint: 'sequence activity' },
  { id: '49', title: 'Alimentação saudável', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/f6a2O8C.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1QIbcck6E2wMimvx4Hw0ePgTAl56XCCxJ', isFavorite: false, aiHint: 'healthy food' },
  { id: '51', title: '+720 Atividades Escolares para Pré escola 1°, 2°, 3°, 4° e 5º ano', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/KdeacSh.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1o55DGXm-3xeEYEDwlxZdGR-nshFX2Con', isFavorite: false, aiHint: 'school activities' },
  { id: '52', title: '+300 Atividades Bíblicas Infantil', category: 'Ensino Completo', thumbnailUrl: 'https://i.imgur.com/MOk7GL4.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1LG6I5KHaBrWvlhMb8IL3em8sP1mZfJNC', isFavorite: false, aiHint: 'bible activities' },

  { id: '9', title: 'Adivinhe o que é', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/WE6PZF2.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1iMkAFLHQn7c7BvELxofO8Nt4jy6ZwM_z', isFavorite: false, aiHint: "riddle" },
  { id: '21', title: 'Rotina', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/A4pLZXf.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1_8SFh8_redUcdLhXXeukbgVbSA0EqYQu', isFavorite: false, aiHint: 'daily routine' },
  { id: '22', title: 'Roleta das cores', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/RdniAvB.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1SOXWU9WErST4ujfqDhG_eqnv2KQYnvNy', isFavorite: false, aiHint: 'color wheel' },
  { id: '24', title: 'Quebra-cabeças', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/hm61zu2.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1GaXxojfmBYf77wPYJIMqeP-2nHyi0GA1', isFavorite: false, aiHint: 'puzzle' },
  { id: '27', title: 'Jogos para autista', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/n7aD5sE.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/14OlnLT2h3QwUCAD-kP6b-WEW0mvJYRW3', isFavorite: false, aiHint: 'autism games' },
  { id: '28', title: 'Jogo da memória', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/FBP98VB.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1_F462SgMdKCvZXSBPDd7kUu7biRv7JmA', isFavorite: false, aiHint: 'memory game' },
  { id: '35', title: 'Emoções', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/3DjF9vp.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1CdeMcf2vTJZBnsZFgdMcBSldhZcEKgCd', isFavorite: false, aiHint: 'feelings chart' },
  { id: '37', title: 'Dominós', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/G2q2rHr.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1Q629gOLdWL-42ivNpdtaY5xrRjNdd2Vt', isFavorite: false, aiHint: 'dominoes game' },
  { id: '43', title: 'Cartões de Comunicação', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/6HHIbdS.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1E6ThcEmkZNCOUQmOjzVRTaTCVDBRjNF_', isFavorite: false, aiHint: 'communication cards' },
  { id: '44', title: 'Bingos', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/94u8Uac.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1oJTWu62uNDqF_-3k3FsK2EYeLBKzs_75', isFavorite: false, aiHint: 'bingo game' },
  { id: '55', title: 'Bingo das Palavras', category: 'Jogos Educativos', thumbnailUrl: 'https://i.imgur.com/RpNv5Du.png', pdfUrl: 'https://drive.google.com/drive/u/4/folders/1wQoSTPOrUtNUbQqc_FjpKxge4XOBlWr3', isFavorite: false, aiHint: 'word bingo' },
];
