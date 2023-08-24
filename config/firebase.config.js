// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwBbP4ngK0Cwy5bay7YSnLI0SnhCNWVKU",
  authDomain: "rebid-app-90c08.firebaseapp.com",
  projectId: "rebid-app-90c08",
  storageBucket: "rebid-app-90c08.appspot.com",
  messagingSenderId: "412865230486",
  appId: "1:412865230486:web:741ec07f77a15a80e8b4b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication,db }