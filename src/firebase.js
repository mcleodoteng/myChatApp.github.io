// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEQXmjV1ZiwD8KZQDSmPvAW1YE8CBOYNc",
  authDomain: "chat-3a060.firebaseapp.com",
  projectId: "chat-3a060",
  storageBucket: "chat-3a060.appspot.com",
  messagingSenderId: "778409848392",
  appId: "1:778409848392:web:d743e886d6638e8473b27d",
  measurementId: "G-MH1XPXWTPP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);
