import { initializeApp } from "firebase/app";
import 'firebase/auth'
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "authapp-31a6d.firebaseapp.com",
  projectId: "authapp-31a6d",
  storageBucket: "authapp-31a6d.appspot.com",
  messagingSenderId: "909105064525",
  appId: "1:909105064525:web:854b8ff43b1a1e0b08ca04",
  measurementId: "G-J793G2VDRP"
};


const app = initializeApp(firebaseConfig);
export {app};
