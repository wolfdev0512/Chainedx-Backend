const admin = require("firebase-admin");
const config = require("../config/config");

// Initialize Firebase Admin SDK
const serviceAccount = config.firebaseConfig;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "chainedx-9384d.appspot.com",
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();

module.exports = { firestore, storage };
