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

      // TODO Check if posts are ordered properly (because of async)
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
          throw error;
        }
      }
      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
});
