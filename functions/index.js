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
    const database = admin.database();
    const snapshot = await database.ref("/post").once("value");

    // TODO Check if posts are ordered properly (because of async)
    let resultArray = [];
    const n = snapshot.numChildren();
    let i = 0;
    snapshot.forEach((post) => {
      let data = { id: post.key };
      // console.log(post);
      Object.assign(data, post.val());

      admin
        .auth()
        .getUser(data.userId)
        .then((user) => {
          data.userName = user.displayName;
          resultArray.unshift(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          ++i;
          if (i >= n) {
            // The loop is finished
            return res.status(200).send(resultArray);
          }
        });
    });

    // If forEach is not finished properly
    return res.status(500);
  });
});
