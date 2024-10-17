import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBcX0evIRQDJyCVxMBDOBocsIsb4cmfdIk",
  authDomain: "nailsgirls.firebaseapp.com",
  projectId: "nailsgirls",
  storageBucket: "nailsgirls.appspot.com",
  messagingSenderId: "541608721222",
  appId: "1:541608721222:web:5c4b4d1830a8402b234347"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };