import { Game } from "@/types/games"
import { getApp, getApps, initializeApp } from "firebase/app"
import {
  getFirestore,
  DocumentData,
  QueryDocumentSnapshot,
  collection,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAz1BNtH1-ao0_PuuA6eOVX6ffH3zZ-bUw",
  authDomain: "chess-77938.firebaseapp.com",
  projectId: "chess-77938",
  storageBucket: "chess-77938.appspot.com",
  messagingSenderId: "610827206996",
  appId: "1:610827206996:web:e1800b61f93b4da7efc8c1",
  measurementId: "G-CK7W9CYZM5",
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

const typedCollection = <T extends DocumentData>(collectionPath: string) =>
  collection(db, collectionPath).withConverter<T, DocumentData>({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  })

export const collections = {
  games: typedCollection<Game>("games"),
}
