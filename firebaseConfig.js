var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flipper-hack-default-rtdb.firebaseio.com"
});
const database = admin.database();

module.exports = { database };
