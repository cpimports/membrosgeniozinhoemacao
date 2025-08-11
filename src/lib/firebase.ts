// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "atv2-po3f3",
  "appId": "1:548675219625:web:2531ad62e9d237e85679b8",
  "storageBucket": "atv2-po3f3.firebasestorage.app",
  "apiKey": "AIzaSyCsM5m0vi2WzkNLAQMYDovadm-6HK1twGo",
  "authDomain": "atv2-po3f3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "548675219625"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
