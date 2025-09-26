import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLjeu_zZeLoPAccnTz1mK7kf60p_wgABA",
  authDomain: "feiranoponto.firebaseapp.com",
  projectId: "feiranoponto",
  storageBucket: "feiranoponto.firebasestorage.app",
  messagingSenderId: "822999487477",
  appId: "1:822999487477:web:0f8c0253335c1fe0b0c6bc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 