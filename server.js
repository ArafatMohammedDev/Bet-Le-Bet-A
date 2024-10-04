require('dotenv').config();
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccount = require('./serviceAccountKey.json.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

app.get('/', (req, res) => {
  const ref = db.ref('/'); // Reference to root
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    res.send(data);
  }, (error) => {
    res.status(500).send('Error fetching data: ' + error.message);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
