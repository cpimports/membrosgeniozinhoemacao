
import { NextRequest, NextResponse } from 'next/server';
import { getApps, initializeApp, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { addDays } from 'date-fns';

// This is a server-side component, so we use firebase-admin
// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (!getApps().length) {
    if (serviceAccount) {
        initializeApp({
            credential: cert(serviceAccount),
        });
    } else {
        // This is for local development without service account file
        // It will use default credentials if available
        initializeApp();
    }
}

const auth = getAuth();
const db = getFirestore();

// --- Mapa de Chaves Secretas e Produtos ---
// Cada chave corresponde a um pacote específico de produtos.
const CAKTO_PLANS: Record<string, string[]> = {
    // Chave para o produto principal
    'd4bcc4ac-0697-427d-8eda-f33feb642b6b': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
    ],
    // Chave para o produto principal + Caderno Fonológico
    '2abdc0a1-b2eb-4175-8040-a5eb4d3ea008': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Caderno Fonológico - Fala, Leitura e Atenção',
    ],
    // Chave para o produto principal + PECS
    '22bdbd79-7542-4481-804e-0b9ecea55dee': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Cartões de Comunicação Visual (PECS)',
    ],
    // Chave para o produto principal + Atividades Sensoriais
    'f3ed6308-1cb4-48c5-b758-9649b4713eb5': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        '+150 Atividades Sensoriais - Foco e calma',
    ],
    // Chave para o produto principal + Caderno + PECS
    '80e71a74-ecd0-4324-978e-608c20337873': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Caderno Fonológico - Fala, Leitura e Atenção',
        'Cartões de Comunicação Visual (PECS)',
    ],
    // Chave para o produto principal + Caderno + Sensoriais
    '55a39afa-edba-4fa3-a2e5-12a88f2b8a3b': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Caderno Fonológico - Fala, Leitura e Atenção',
        '+150 Atividades Sensoriais - Foco e calma',
    ],
    // Chave para o produto principal + PECS + Sensoriais
    '431048f4-ef42-46cc-a9dc-1fc931e969ee': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Cartões de Comunicação Visual (PECS)',
        '+150 Atividades Sensoriais - Foco e calma',
    ],
    // Chave para TODOS os produtos
    'acba5002-e3de-4b46-993b-d6d1365f58ed': [
        'Mais de 1500 Atividades adaptadas e lúdicas para autistas!',
        'Caderno Fonológico - Fala, Leitura e Atenção',
        'Cartões de Comunicação Visual (PECS)',
        '+150 Atividades Sensoriais - Foco e calma',
    ],
};

export async function POST(req: NextRequest) {
  try {
    const caktoSignature = req.headers.get('cakto-signature');
    
    // 1. Verificar se a chave secreta do webhook é válida
    if (!caktoSignature || !CAKTO_PLANS[caktoSignature]) {
      console.warn('Invalid or missing Cakto webhook signature received.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obter a lista de produtos para a chave válida
    const productsForThisPlan = CAKTO_PLANS[caktoSignature];
    console.log(`Webhook received for plan with products: ${productsForThisPlan.join(', ')}`);

    const payload = await req.json();
    console.log('Cakto webhook payload received:', payload);

    // 2. Extrair informações do usuário do payload
    const email = payload.customer?.email;
    const name = payload.customer?.name;

    if (!email || !name) {
      console.error('Webhook payload is missing customer email or name.');
      return NextResponse.json({ error: 'Missing customer information' }, { status: 400 });
    }

    // 3. Criar ou atualizar o usuário no Firebase e Firestore
    let userRecord;
    try {
      // Usuário já existe, vamos atualizar seus produtos e assinatura
      userRecord = await auth.getUserByEmail(email);
      console.log(`User ${email} already exists. Updating subscription and products.`);

      const userRef = db.collection('users').doc(userRecord.uid);
      const userDoc = await userRef.get();
      const userData = userDoc.data() || {};
      const existingProducts = userData.products || [];
      
      // Combina os produtos existentes com os novos produtos do plano, sem duplicatas
      const allProducts = [...new Set([...existingProducts, ...productsForThisPlan])];

      await userRef.set({
        products: allProducts,
        subscription: {
          status: 'active',
          validUntil: Timestamp.fromDate(addDays(new Date(), 30)), // Renova a assinatura por 30 dias
        },
      }, { merge: true });

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Usuário não existe, vamos criá-lo
        console.log(`Creating new user for ${email}.`);
        userRecord = await auth.createUser({
          email: email,
          displayName: name,
          emailVerified: true, // Confiamos no e-mail do provedor de pagamento
        });

        // Criar o documento do usuário no Firestore com os produtos do plano
        const userRef = db.collection('users').doc(userRecord.uid);
        await userRef.set({
          uid: userRecord.uid,
          name: name,
          email: email,
          products: productsForThisPlan,
          subscription: {
            status: 'active',
            validUntil: Timestamp.fromDate(addDays(new Date(), 30)),
          },
          createdAt: Timestamp.now(),
        });
        
        console.log(`User created. Instruct user to use 'Forgot Password' to set their initial password.`);

      } else {
        // Outro erro, relançar
        throw error;
      }
    }
    
    return NextResponse.json({ success: true, userId: userRecord.uid });

  } catch (error: any) {
    console.error('Error processing Cakto webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
