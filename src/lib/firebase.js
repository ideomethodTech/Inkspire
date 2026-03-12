import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {  
  apiKey: "AIzaSyBQx5LNsqoa6FNzLp0Mzh2nLimSGDYdtXQ",
  authDomain: "inkspire-dev-prasanna.firebaseapp.com",
  projectId: "inkspire-dev-prasanna",
  storageBucket: "inkspire-dev-prasanna.firebasestorage.app",
  messagingSenderId: "831701763718",
  appId: "1:831701763718:web:11343ebf9c0b13d814b307"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);