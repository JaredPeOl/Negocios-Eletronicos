// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8A5W4i_3ym0sWwUWOkLuUQRGrFNeT5cc",
  authDomain: "myfirstproject-e4866.firebaseapp.com",
  projectId: "myfirstproject-e4866",
  storageBucket: "myfirstproject-e4866.appspot.com",
  messagingSenderId: "234935159749",
  appId: "1:234935159749:web:33b801ddbcd8b06f3c19ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);