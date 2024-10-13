import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import dayJs from ' https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Firebase configuration (same as before)
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

// Reference to the 'registration' or 'posts' node in the database
const postsRef = ref(database, 'posts'); // Change 'registration' if you're using another node for posts

// Fetch posts from the database
get(postsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const postsData = snapshot.val(); // Get posts data from the snapshot
      let posted = ''; // Initialize an empty string to hold the HTML content

      // Loop through the posts and create HTML for each post
      Object.keys(postsData).forEach((postId) => {
        const post = postsData[postId]; // Access each post using its ID
        posted += `
        <div class="post">
          <div class="userInfo">
            <i class="fa-solid fa-user"></i>
            <h1 class="name">${post.username}</h1>
            <p>Posted just now</p> <!-- You can adjust time logic if needed -->
          </div>
          <div class="description">
              ${post.description}
              <a href="#">More...</a>
            </div>
        </div>
        `;
      });

      // Inject the posts into the page
      document.querySelector('.content-tab').innerHTML = posted;
    } else {
      console.log("No posts available");
    }
  })
  .catch((error) => {
    console.error("Error fetching posts: ", error);
  });
