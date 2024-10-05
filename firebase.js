// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaNIzZBsOSXrOOni5KSGBuI9MaTcmWnSQ",
  authDomain: "erp-system-8fae5.firebaseapp.com",
  projectId: "erp-system-8fae5",
  storageBucket: "erp-system-8fae5.appspot.com",
  messagingSenderId: "565563980780",
  appId: "1:565563980780:web:84955ca40a5537dbc65ec9",
  measurementId: "G-KQ9JHT81WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);