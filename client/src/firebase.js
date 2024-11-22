// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-supplement-store.firebaseapp.com",
  projectId: "mern-supplement-store",
  storageBucket: "mern-supplement-store.firebasestorage.app",
  messagingSenderId: "699726346757",
  appId: "1:699726346757:web:f251fd2a3dfca188ac3a6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);