import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


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



// JavaScript to handle form submission and add simple validation
document
  .getElementById("signin-form")
  .addEventListener("submit", async function (event) {
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
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            // Username is taken
            document.getElementById("signup-username").style.borderColor =
              "red";
            document.getElementById("register-manualy").innerText =
              "Username already taken!";
            document.getElementById("register-manualy").style.color = "red";
          } else {
            // Username is available, proceed to generate a unique security code
            const securityCode = 0// Wait for a unique security code

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
var msg = document.querySelector(".passwordMssg");
var str = document.getElementById("strenght");
const signUpBtn = document.querySelector(".sign-in-btn");

pass.addEventListener("input", () => {
  if (pass.value.length > 0) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
  if (pass.value.length < 5) {
    str.innerHTML = "Weak";
    pass.style.borderColor = "#ff5925";
    str.style.color = "#ff5925";
    signUpBtn.style.display = "none";
  } else if (pass.value.length >= 5 && pass.value.length < 8) {
    str.innerHTML = "Medium";
    pass.style.borderColor = "orange";
    str.style.color = "orange";
    signUpBtn.style.display = "block";
  } else {
    str.innerHTML = "Strong";
    pass.style.borderColor = "#26d730";
    str.style.color = "#26d730";
    signUpBtn.style.display = "block";
  }
});
