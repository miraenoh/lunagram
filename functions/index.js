// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lunagram-server.firebaseio.com/"
});

// To enable HTTP requests from the front app
const cors = require("cors")({ origin: true });

// helloWorld function for the connection teste
exports.helloWorld = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    res.status(200).json({
      message: "Hello from Firebase!"
    });
  });
});

exports.getPosts = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const database = admin.database();
      const snapshot = await database.ref("/post").once("value");

      let results = [];
      snapshot.forEach((post) => {
        let data = { id: post.key };
        Object.assign(data, post.val());
        results.unshift(data);
      });

      // Add username to each result
      for (const result of results) {
        try {
          let user = await admin.auth().getUser(result.userId);
          result.userName = user.displayName;
        } catch (error) {
          console.error(error);
          return res.status(500).send();
        }
      }
      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
});

exports.getPostListByUid = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const uid = req.query.uid;

      const ref = admin.database().ref("/post");
      const snapshot = await ref
        .orderByChild("userId")
        .equalTo(uid)
        .once("value");

      let results = [];
      snapshot.forEach((post) => {
        let data = { id: post.key };
        // TODO handle only imgSrc instead of all data
        Object.assign(data, post.val());
        results.unshift(data);
      });

      // Add username to each result
      for (const result of results) {
        try {
          let user = await admin.auth().getUser(result.userId);
          result.userName = user.displayName;
        } catch (error) {
          console.error(error);
          return res.status(500).send();
        }
      }
      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
});

exports.getUserByUsername = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const username = req.query.username;

    let ref = admin.database().ref("user");
    try {
      const snapshot = await ref
        .orderByChild("name")
        .equalTo(username)
        .once("value");

      if (snapshot.val() !== null) {
        const uid = Object.keys(snapshot.val())[0];
        return res.status(200).send(uid);
      } else {
        return res.status(500).send();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
  });
});
