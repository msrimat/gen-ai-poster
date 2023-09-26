// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPm7rgBmfu0v1GcukUarraaYTxXKXcRNw",
  authDomain: "ai-poster-bd00b.firebaseapp.com",
  projectId: "ai-poster-bd00b",
  storageBucket: "ai-poster-bd00b.appspot.com",
  messagingSenderId: "636988653255",
  appId: "1:636988653255:web:4b12b5dbf028e984e188e2",
  measurementId: "G-EDNN1TNWE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;