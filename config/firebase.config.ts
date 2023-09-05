import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);

const authentication = initializeAuth(app,{
  persistence:reactNativePersistence(AsyncStorage),
});

export { db,authentication }