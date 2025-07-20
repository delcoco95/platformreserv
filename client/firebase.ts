// client/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ AJOUTÉ

const firebaseConfig = {
  apiKey: "AIzaSyBOA4MEcfvM7JAt3AdC-a9ze-HHwYNigPc",
  authDomain: "platformresa.firebaseapp.com",
  projectId: "platformresa",
  storageBucket: "platformresa.firebasestorage.app",
  messagingSenderId: "756068875532",
  appId: "1:756068875532:web:06786cb06ca2fe98605d29",
  measurementId: "G-HVMP6B1YB8",
};

// Initialisation
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


