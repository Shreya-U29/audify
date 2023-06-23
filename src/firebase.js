// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7NjFB3lReJErV2OyIL1DEzCnlxu8tqjg",
  authDomain: "audify-c5c34.firebaseapp.com",
  projectId: "audify-c5c34",
  storageBucket: "audify-c5c34.appspot.com",
  messagingSenderId: "1041324751620",
  appId: "1:1041324751620:web:2a285b5125af8da7f4ae51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;