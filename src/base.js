
import firebase from "firebase";
import Rebase from "re-base";
  // Initialize Firebase
export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_URL
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
