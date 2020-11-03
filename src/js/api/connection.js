import firebase from "firebase/app";
import "firebase/database";

export const onConnectionChanged = (onConnection) =>
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => onConnection(snapshot.val()));

import db from "../db/firestore";

const getOnlineStatus = (isOnline) => ({
  state: isOnline ? "online" : "offline",
  lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
});

export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`);
  const updateData = getOnlineStatus(isOnline);
  return userRef.update(updateData);
};
