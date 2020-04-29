// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

// To enable HTTP requests from the front app
const cors = require("cors")({ origin: true });

// helloWorld function for the connection teste
exports.helloWorld = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    res.status(200).json({
      message: "Hello from Firebase!",
    });
  });
});
