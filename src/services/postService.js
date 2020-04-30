import * as firebase from "firebase";

import * as properties from "../properties";

// Initialize firebase
export const initFirebase = () => {
  firebase.initializeApp(properties.FIREBASE_CONFIG);
};

// Get all posts from the Firebase realtime database
export async function getAllPosts() {
  const database = firebase.app().database();

  const snapshot = await database.ref("/post").once("value");

  const resultArray = [];
  snapshot.forEach((post) => {
    let data = { id: post.key };
    Object.assign(data, post.val());
    resultArray.unshift(data);
  });

  return resultArray;
}

// Upload a file to the Firebase storage
export async function uploadFile(filePath, file, fileName) {
  let storage = firebase.app().storage();
  let ref = storage.ref().child(filePath + "/" + fileName + ".jpg");

  let snapshot = await ref.put(file);
  let url = await snapshot.ref.getDownloadURL();

  return url;
}

export async function postObject(path, data) {
  const database = firebase.app().database();
  let ref = database.ref().child(path);

  let generatedKey = (await ref.push(data)).key;

  return generatedKey;
}
