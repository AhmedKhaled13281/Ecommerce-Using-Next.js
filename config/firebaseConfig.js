// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPPEPIhyv-n9twayHgo3CqD7DKVjDAlTk",
  authDomain: "full-stack-ecommerce-next.firebaseapp.com",
  projectId: "full-stack-ecommerce-next",
  storageBucket: "full-stack-ecommerce-next.appspot.com",
  messagingSenderId: "231914330294",
  appId: "1:231914330294:web:5d63f58146bd13b409ee17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };