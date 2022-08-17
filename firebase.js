// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
  getApps,
} from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'twittercopy-f676c.firebaseapp.com',
  projectId: 'twittercopy-f676c',
  storageBucket: 'twittercopy-f676c.appspot.com',
  messagingSenderId: '1032502208999',
  appId: '1:1032502208999:web:40f119af4610d64c473542',
}

// Initialize Firebase
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
