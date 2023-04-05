import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_PDSs9DbWXFXCaWlQWN9BFU-d_VBOS-s",
  authDomain: "react-native-app-db356.firebaseapp.com",
  projectId: "react-native-app-db356",
  storageBucket: "react-native-app-db356.appspot.com",
  messagingSenderId: "593544685604",
  appId: "1:593544685604:web:85b142461fae91f14e10b1",
  measurementId: "G-LS0MR739WC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
