import firebase from "firebase";
import axios from "axios";

// Get all posts from the Firebase realtime database
export async function getAllPosts() {
  try {
    const response = await axios.get(
      "https://us-central1-lunagram-server.cloudfunctions.net/getPosts"
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Upload a file to the Firebase storage
export async function uploadFile(filePath, file, fileName) {
  let storage = firebase.storage();
  let ref = storage.ref().child(filePath + "/" + fileName + ".jpg");

  let snapshot = await ref.put(file);
  let url = await snapshot.ref.getDownloadURL();

  return url;
}

export async function postObject(path, data) {
  const database = firebase.database();
  let ref = database.ref().child(path);

  let generatedKey = (await ref.push(data)).key;

  return generatedKey;
}
