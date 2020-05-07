import firebase from "firebase";

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function logOut() {
  return firebase.auth().signOut();
}
