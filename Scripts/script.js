import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCVIym8X-GDRx6_1256dtVZdo3hIm7TRgI",
  authDomain: "flipper-hack.firebaseapp.com",
  databaseURL: "https://flipper-hack-default-rtdb.firebaseio.com",
  projectId: "flipper-hack",
  storageBucket: "flipper-hack.appspot.com",
  messagingSenderId: "9118741906",
  appId: "1:9118741906:web:d8860d3094a46bafd37d4b",
  measurementId: "G-EYLLFHW5XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// JavaScript to handle form submission and add a simple validation
document
  .getElementById("signin-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the input fields
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const firstname = document.getElementById("first-name").value;
    const lastname = document.getElementById("last-name").value;
    const phoneNumber = document.getElementById("phone-number").value;

    if (phoneNumber) {
      // Check if username is already taken
      const userRef = ref(database, `users/${username}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Username is taken
            document.getElementById("register-manualy").innerText =
              "Username already taken!";
            document.getElementById("register-manualy").className =
              "userNameEror";
          } else {
            // Username is available, proceed to register the user
            const securityCode = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number

            const userData = {
              username: username,
              phoneNumber: phoneNumber,
              firstName: firstname,
              lastName: lastname,
              password: password,
              securityCode: securityCode,
            };

            // Save user data to Firebase
            set(userRef, userData)
              .then(() => {
                localStorage.setItem("username", username); // Store the username in local storage
                window.location.href = "../index.html"; // Redirect to index.html
              })
              .catch((error) => {
                console.error("Error saving user data: ", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking username: ", error);
        });
    }
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the input fields
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Reference to the user data in the database
    const userRef = ref(database, `users/${username}`);

    // Get the user data
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Retrieved user data:", userData); // Debug log

          // Check if the entered password matches the stored password
          // Remember to implement hashing for security
          if (userData.password === password) {
            // Replace with password comparison if hashed
            localStorage.setItem("username", username); // Store the username in local storage
            window.location.href = "../index.html"; // Redirect to index.html
          } else {
            document.getElementById("error-message").innerText =
              "Invalid password!";
            document.getElementById("error-message").style.display = "block";
          }
        } else {
          document.getElementById("error-message").innerText =
            "Username not found!";
          document.getElementById("error-message").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  });

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

/*
-strenght
*/
var pass = document.getElementById("signup-password");
var msg = document.getElementById("passwordMssg");
var str = document.getElementById("strenght");

pass.addEventListener("input", () => {
  if (pass.value.length > 0) {
    msg.style.display = "block;";
  } else {
    msg.style.display = "none";
  }
  if (pass.value.length < 4) {
    str.innerHTML = "Weak";
  }
});
