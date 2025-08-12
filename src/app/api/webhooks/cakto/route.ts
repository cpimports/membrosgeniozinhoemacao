
import { NextRequest, NextResponse } from 'next/server';
import { getApps, initializeApp, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { addDays } from 'date-fns';

// This is a server-side component, so we use firebase-admin
// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (!getApps().length) {
  initializeApp({
    credential: serviceAccount ? require('firebase-admin').credential.cert(serviceAccount) : undefined,
  });
}

const auth = getAuth();
const db = getFirestore();

// Your Cakto webhook secret key
const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET || 'd4bcc4ac-0697-427d-8eda-f33feb642b6b';

export async function POST(req: NextRequest) {
  try {
    const caktoSignature = req.headers.get('cakto-signature');
    
    // 1. Verify the webhook signature
    if (caktoSignature !== CAKTO_WEBHOOK_SECRET) {
      console.warn('Invalid Cakto webhook signature received.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    console.log('Cakto webhook payload received:', payload);

    // 2. Extract user information from the payload
    // IMPORTANT: Adjust these fields based on the actual payload structure from Cakto
    const email = payload.customer?.email;
    const name = payload.customer?.name;
    const productName = payload.product?.name;

    if (!email || !name) {
      console.error('Webhook payload is missing customer email or name.');
      return NextResponse.json({ error: 'Missing customer information' }, { status: 400 });
    }

    // 3. Create user in Firebase and Firestore
    let userRecord;
    try {
      // Check if user already exists
      userRecord = await auth.getUserByEmail(email);
      console.log(`User ${email} already exists. Updating subscription.`);

      // Update existing user's subscription
      const userRef = db.collection('users').doc(userRecord.uid);
      await userRef.set({
        products: [productName],
        subscription: {
          status: 'active',
          validUntil: Timestamp.fromDate(addDays(new Date(), 30)),
        },
      }, { merge: true });


    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`Creating new user for ${email}.`);
        // User does not exist, create them
        userRecord = await auth.createUser({
          email: email,
          displayName: name,
          emailVerified: true, // We trust the email from the payment provider
        });

        // Create user document in Firestore
        const userRef = db.collection('users').doc(userRecord.uid);
        await userRef.set({
          uid: userRecord.uid,
          name: name,
          email: email,
          products: [productName],
          subscription: {
            status: 'active',
            validUntil: Timestamp.fromDate(addDays(new Date(), 30)),
          },
          createdAt: Timestamp.now(),
        });
        
        // 4. Send password reset email for the new user to set their password
        const passwordResetLink = await auth.generatePasswordResetLink(email);
        
        // HERE you would integrate an email service (like SendGrid, Resend, etc.)
        // to send a welcome email with the passwordResetLink.
        // As I cannot do that, the user will have to use the "Forgot Password" flow for now.
        console.log(`User created. Instruct user to use 'Forgot Password'. Link: ${passwordResetLink}`);

      } else {
        // Other error, re-throw
        throw error;
      }
    }
    
    return NextResponse.json({ success: true, userId: userRecord.uid });

  } catch (error: any) {
    console.error('Error processing Cakto webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
