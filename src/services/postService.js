import firebase from "firebase";
import axios from "axios";

import * as databaseService from "./databaseService";

import { LUNA_CLOUD_FUNCTIONS_URL } from "../properties";

// Get all posts from the Firebase realtime database
export async function getAllPosts() {
  try {
    const url = LUNA_CLOUD_FUNCTIONS_URL.concat("/getPosts");
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPostByPid(pid) {
  try {
    const url = LUNA_CLOUD_FUNCTIONS_URL.concat("/getPostByPid");
    const response = await axios.get(url, {
      params: {
        pid: pid
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPostListsByUid(uid) {
  try {
    const url = LUNA_CLOUD_FUNCTIONS_URL.concat("/getPostListByUid");
    const response = await axios.get(url, {
      params: {
        uid: uid
      }
    });

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

export async function post(data) {
  let generatedKey = await databaseService.postObject("post", data);

  return generatedKey;
}
