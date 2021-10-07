// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQWtNcC9Eno2fEll2MMqd6wlBb_W-OuBw",
  authDomain: "flipkart-clone-react.firebaseapp.com",
  projectId: "flipkart-clone-react",
  storageBucket: "flipkart-clone-react.appspot.com",
  messagingSenderId: "63258720128",
  appId: "1:63258720128:web:6423c3284838fdedf57365",
  measurementId: "G-D3JZDCB4C8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
