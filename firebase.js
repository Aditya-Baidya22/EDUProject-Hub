// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBa_lpCDc2rqk1uaMgnKOvE1zb2r8soDq8",
  authDomain: "eduproject-hub-42d17.firebaseapp.com",
  projectId: "eduproject-hub-42d17",
  storageBucket: "eduproject-hub-42d17.firebasestorage.app",
  messagingSenderId: "649646082558",
  appId: "1:649646082558:web:6c2c78154241f2e86298af",
  measurementId: "G-C4GJM8QMQ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
