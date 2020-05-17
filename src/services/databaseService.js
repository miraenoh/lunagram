import firebase from "firebase";

export async function postObject(path, data) {
  const database = firebase.database();
  let ref = database.ref().child(path);

  let generatedKey = (await ref.push(data)).key;

  return generatedKey;
}

export async function postObjectWithKey(path, key, data) {
  const database = firebase.database();
  let ref = database.ref().child(path);

  await ref.child(key).set(data);

  return true;
}

export async function readObject(path, key) {
  const database = firebase.database();
  let ref = database
    .ref()
    .child(path)
    .child(key);

  try {
    const snapshot = await ref.once("value");
    return snapshot.val();
  } catch (error) {
    return false;
  }
}
