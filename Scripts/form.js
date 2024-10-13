import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push
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
// JavaScript to handle form submission
// JavaScript to handle form submission
document.getElementById("signin-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve username from local storage
  const username = localStorage.getItem("username");

  // Get values from the form fields
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const password = document.getElementById("signup-password").value;

  // Simple validation (ensure all fields are filled out)
  if (description && location && phoneNumber && password && username) {
    // Reference to the 'underReview' node
    const reviewRef = ref(database, 'underReview');

    const formData = {
      description: description,
      location: location,
      phoneNumber: phoneNumber,
      password: password,
      username: username,
      status: 'under review', // Set the status to "under review"
      createdAt: new Date().toISOString(),
      likes: 0,  // Initialize likes
      dislikes: 0  // Initialize dislikes
    };

    // Save the form data in Firebase
    push(reviewRef, formData)
      .then(() => {
        // Show success message
        document.getElementById("signin-form").reset(); // Reset the form
        alert("Your submission is under review."); 
        window.location.href = "index.html"; // Redirect to the home page
      })
      .catch((error) => {
        console.error("Error saving form data: ", error);
        alert("Error submitting the form. Please try again.");
      });
  } else {
    alert("Please fill in all fields.");
  }
});


const submitBtn = document.querySelector('.sign-in-btn');
const textArea = document.getElementById('description');
const minWords = 20;
const maxWords = 100;

textArea.addEventListener('input', () => {
    const words = textArea.value.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length > maxWords) {
        textArea.style.borderColor = 'red'; 
        submitBtn.disabled = true; // Disable the button if above max
        document.querySelector('.textarea-error-msg')
        .innerHTML = `You have exceeded the maximum word limit of ${maxWords} words`;
    } else if (words.length < minWords) {
        textArea.style.borderColor = 'red'; // Highlight the textarea if below min
        submitBtn.disabled = true; // Disable the button if below min
        document.querySelector('.textarea-error-msg') 
            .innerHTML = `Please enter at least ${minWords} words`;
    } else if (words.length >= minWords && words.length <= maxWords) {
        textArea.style.borderColor = 'green'; // Enable the button if within range
        submitBtn.disabled = false; // Enable the button if within range
        document.querySelector('.textarea-error-msg').innerHTML = '';   
    }
});
