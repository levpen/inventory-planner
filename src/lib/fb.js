//@ts-nocheck
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBV7yrdbqcyOyuIXdp8CN7_CHC_uBv_R6Q",
  authDomain: "inventory-planner-b54a5.firebaseapp.com",
  projectId: "inventory-planner-b54a5",
  storageBucket: "inventory-planner-b54a5.appspot.com",
  messagingSenderId: "414972783341",
  appId: "1:414972783341:web:d4ac3f11299b50bd0e7ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth }
