import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS-3_SIz01CDCAfQT3tvU-8BKGWIMbZwA",
  authDomain: "redux-shopping-app-cf439.firebaseapp.com",
  projectId: "redux-shopping-app-cf439",
  storageBucket: "redux-shopping-app-cf439.appspot.com",
  messagingSenderId: "1007231794818",
  appId: "1:1007231794818:web:e136cca339d92e0f1a7e9b",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
