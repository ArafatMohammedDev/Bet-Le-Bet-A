import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
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

// Retrieve username from local storage
const currentUser = localStorage.getItem("username"); 

// Reference to the 'posts' node in the database
const postsRef = ref(database, 'posts');

// Function to fetch and display posts
get(postsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const postsData = snapshot.val();
      let posted = '';

      Object.keys(postsData).forEach((postId) => {
        const post = postsData[postId];
        posted += `
        <div class="post" data-post-id="${postId}">
          <div class="userInfo">
            <i class="fa-solid fa-user"></i>
            <h1 class="name">${post.username}</h1>
            <p>Posted just now</p>
          </div>
          <div class="description">
            ${post.description}
            <a href="#">More...</a>
          </div>
          <div class="likes-dislikes">
            <button class="like-button" data-post-id="${postId}">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <span class="like-count">${post.likes || 0}</span>
            <button class="dislike-button" data-post-id="${postId}">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <span class="dislike-count">${post.dislikes || 0}</span>
          </div>
        </div>
        `;
      });

      // Inject the posts into the page
      document.querySelector('.content-tab').innerHTML = posted;

      document.querySelector('.content-tab').addEventListener('click', (e) => {
  if (e.target.closest('.like-button')) {
    const postId = e.target.closest('.post').getAttribute('data-post-id');
    handleLike(postId);
  }
});


      // Attach event listeners for likes and dislikes
    document.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const postId = e.target.closest('.post').getAttribute('data-post-id');
        handleLike(postId);
      });
    });


      document.querySelectorAll('.dislike-button').forEach(button => {
        button.addEventListener('click', (e) => {
          const postId = e.target.closest('.post').getAttribute('data-post-id');
          handleDislike(postId);
        });
      });

    } else {
      console.log("No posts available");
    }
  })
  .catch((error) => {
    console.error("Error fetching posts: ", error);
  });

// Function to handle liking a post
function handleLike(postId) {
  const postRef = ref(database, `posts/${postId}`);

  get(postRef).then((snapshot) => {
    if (snapshot.exists()) {
      const post = snapshot.val();
      const userLikes = post.likedBy || {};
      const userDislikes = post.dislikedBy || {};

      // Check if the user has already liked the post
      if (userLikes[currentUser]) {
        alert("You have already liked this post.");
        return;
      }

      // Initialize likes and dislikes if undefined
      post.likes = post.likes || 0;
      post.dislikes = post.dislikes || 0;

      // If the user disliked the post before, remove the dislike
      if (userDislikes[currentUser]) {
        delete userDislikes[currentUser];
        post.dislikes = post.dislikes - 1;
      }

      // Add the like and update in the database
      post.likes = post.likes + 1;
      userLikes[currentUser] = true; // Mark that the user liked this post

      update(postRef, { likes: post.likes, likedBy: userLikes, dislikes: post.dislikes, dislikedBy: userDislikes })
        .then(() => {
          document.querySelector(`.post[data-post-id="${postId}"] .like-count`).innerText = post.likes;
          document.querySelector(`.post[data-post-id="${postId}"] .dislike-count`).innerText = post.dislikes;
        });
    }
  });
}

// Function to handle disliking a post
function handleDislike(postId) {
  const postRef = ref(database, `posts/${postId}`);

  get(postRef).then((snapshot) => {
    if (snapshot.exists()) {
      const post = snapshot.val();
      const userLikes = post.likedBy || {};
      const userDislikes = post.dislikedBy || {};

      // Check if the user has already disliked the post
      if (userDislikes[currentUser]) {
        alert("You have already disliked this post.");
        return;
      }

      // Initialize likes and dislikes if undefined
      post.likes = post.likes || 0;
      post.dislikes = post.dislikes || 0;

      // If the user liked the post before, remove the like
      if (userLikes[currentUser]) {
        delete userLikes[currentUser];
        post.likes = post.likes - 1;
      }

      // Add the dislike and update in the database
      post.dislikes = post.dislikes + 1;
      userDislikes[currentUser] = true; // Mark that the user disliked this post

      update(postRef, { dislikes: post.dislikes, dislikedBy: userDislikes, likes: post.likes, likedBy: userLikes })
        .then(() => {
          document.querySelector(`.post[data-post-id="${postId}"] .like-count`).innerText = post.likes;
          document.querySelector(`.post[data-post-id="${postId}"] .dislike-count`).innerText = post.dislikes;
        });
    }
  });
}
