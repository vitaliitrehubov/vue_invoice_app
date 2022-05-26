// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtu3Jmnz2B7dYpRFQYlqMK2C2lrTIcgpc",
  authDomain: "vue-invoice-app-eaa52.firebaseapp.com",
  projectId: "vue-invoice-app-eaa52",
  storageBucket: "vue-invoice-app-eaa52.appspot.com",
  messagingSenderId: "762222736035",
  appId: "1:762222736035:web:0e98b7736d0a71eeea4516",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// const db = app.firestore().db.collection('invoices').doc
