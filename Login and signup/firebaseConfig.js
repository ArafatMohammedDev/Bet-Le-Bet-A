// firebaseConfig.js (for client-side use)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1PdDQ7UxqbrLp31yCxnHLkZ7PKPJdo7M",
  authDomain: "bet-le-bet.firebaseapp.com",
  projectId: "bet-le-bet",
  storageBucket: "bet-le-bet.appspot.com",
  messagingSenderId: "520191490943",
  appId: "1:520191490943:web:0829c204a776ad7af9784a",
  measurementId: "G-6TZ3KMFN50"
};

// Import the Firebase JavaScript SDK dynamically in the HTML file
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
