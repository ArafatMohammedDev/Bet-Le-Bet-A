import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration (same as signin.js)
const firebaseConfig = {
  apiKey: "AIzaSyC1PdDQ7UxqbrLp31yCxnHLkZ7PKPJdo7M",
  authDomain: "bet-le-bet.firebaseapp.com",
  projectId: "bet-le-bet",
  storageBucket: "bet-le-bet.appspot.com",
  messagingSenderId: "520191490943",
  appId: "1:520191490943:web:0829c204a776ad7af9784a",
  measurementId: "G-6TZ3KMFN50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// JavaScript to handle form submission
document.getElementById("signin-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get values from the form fields
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const password = document.getElementById("signup-password").value;

  // Simple validation (ensure all fields are filled out)
  if (description && location && phoneNumber && password) {
    // Define a unique reference in Firebase under 'registration'
    const postRef = ref(database, `posts/${phoneNumber}`);

    const formData = {
      description: description,
      location: location,
      phoneNumber: phoneNumber,
      password: password
    };

    // Save the form data in Firebase
    set(postRef, formData)
      .then(() => {
        // Show success message
        window.location.href = "../index.html";    
        document.getElementById("signin-form").reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error saving form data: ", error);
        alert("Error submitting the form. Please try again.");
      });
  } else {
    alert("Please fill in all fields.");
  }
});
