// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjVBKkmTLPo8QIa4yMSKv3SFPGWElf-wA",
  authDomain: "projet-iot-effaf.firebaseapp.com",
  projectId: "projet-iot-effaf",
  storageBucket: "projet-iot-effaf.appspot.com",
  messagingSenderId: "423960730386",
  appId: "1:423960730386:web:1da30c78d7b9ecac4ab1cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const database = getDatabase();