// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCjnWBDg-Tfno-kQLrWfkM3d0VgHepYtoo",
  authDomain: "react-db-11b9f.firebaseapp.com",
  projectId: "react-db-11b9f",
  storageBucket: "react-db-11b9f.appspot.com",
  messagingSenderId: "6178532350",
  appId: "1:6178532350:web:7e8aa9bcaeb80c3422eeaf",
  measurementId: "G-5M75Q322W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getFirestore(app)
export {app}
export { store }
