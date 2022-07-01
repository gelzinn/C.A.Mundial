import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC350FgZ5eHd8klQy6aO5Z6EN6yrVhckio",
  authDomain: "camundial-4faa1.firebaseapp.com",
  databaseURL: "https://camundial-4faa1-default-rtdb.firebaseio.com",
  projectId: "camundial-4faa1",
  storageBucket: "camundial-4faa1.appspot.com",
  messagingSenderId: "546762496336",
  appId: "1:546762496336:web:e3dc46fbaf39e0f3adb455",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, db, storage };
