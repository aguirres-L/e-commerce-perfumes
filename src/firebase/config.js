import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyA3Cn9e9j8iOx6RNQoYfCVUOpLXJmNKPPI",
  authDomain: "verdu-shop.firebaseapp.com",
  projectId: "verdu-shop",
  storageBucket: "verdu-shop.appspot.com",
  messagingSenderId: "188984786995",
  appId: "1:188984786995:web:5c6ce0dd1e82975d1da346"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencias a las colecciones
export const perfumesRef = collection(db, "perfumes");
export const variosRef = collection(db, "varios");

export { db };