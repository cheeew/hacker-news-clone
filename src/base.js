
import firebase from "firebase";
import Rebase from "re-base";
  // Initialize Firebase
export const firebaseApp = firebase.initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE_URL
});

const base = Rebase.createClass(firebaseApp.database().ref('/v0'));

export default base;
