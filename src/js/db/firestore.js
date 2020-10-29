import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB7642RrIBmXRvr7QFoW2glDyTWTu-i5Ao",
  authDomain: "electron-chat-1379f.firebaseapp.com",
  databaseURL: "https://electron-chat-1379f.firebaseio.com",
  projectId: "electron-chat-1379f",
  storageBucket: "electron-chat-1379f.appspot.com",
  messagingSenderId: "73570118514",
  appId: "1:73570118514:web:0a0757f354d8cc9d758beb",
};

export const { Timestamp } = firebase.firestore;

export default firebase.initializeApp(config).firestore();
