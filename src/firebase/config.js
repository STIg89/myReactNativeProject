import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3yrfam2NUC0O6dg9Sa9lXjsoJAUYUe1o",
  authDomain: "reactnative-1f98a.firebaseapp.com",
  projectId: "reactnative-1f98a",
  storageBucket: "reactnative-1f98a.appspot.com",
  messagingSenderId: "113094377807",
  appId: "1:113094377807:web:6c3e5e86f009d240c9c53a",
  measurementId: "G-ZQN5MWL94E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
