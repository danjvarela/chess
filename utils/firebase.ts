// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz1BNtH1-ao0_PuuA6eOVX6ffH3zZ-bUw",
  authDomain: "chess-77938.firebaseapp.com",
  projectId: "chess-77938",
  storageBucket: "chess-77938.appspot.com",
  messagingSenderId: "610827206996",
  appId: "1:610827206996:web:e1800b61f93b4da7efc8c1",
  measurementId: "G-CK7W9CYZM5",
}

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
