import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATVD3JZUP4d4hTGGKO7qTe91_yUhMJSeg",
  authDomain: "myreactnativeproject-861ab.firebaseapp.com",
  projectId: "myreactnativeproject-861ab",
  storageBucket: "myreactnativeproject-861ab.appspot.com",
  messagingSenderId: "76449919519",
  appId: "1:76449919519:web:1d8a02114c5c2424c5db2a",
  measurementId: "G-ZW52QYPQPY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
