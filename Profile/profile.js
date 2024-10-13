import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    update
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration (replace with your actual config)
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

// Get the username from local storage
const storedUsername = localStorage.getItem("username");

console.log(storedUsername);

// Function to fetch user data
function fetchUserData(username) {
    const userRef = ref(database, `users/${username}`);
    return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // Returns the user data
        } else {
            console.error("No user data found.");
            return null; // Ensure null is returned
        }
    }).catch((error) => {
        console.error("Error fetching user data: ", error);
        return null; // Ensure null is returned on error
    });
}

// Function to fetch all active posts
function fetchPosts() {
    const postsRef = ref(database, 'posts'); // Reference to the posts node
    return get(postsRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // Returns all posts data
        } else {
            console.error("No posts available");
            return null; // Ensure null is returned
        }
    }).catch((error) => {
        console.error("Error fetching posts: ", error);
        return null; // Ensure null is returned on error
    });
}

// Function to fetch posts under 'underReview'
function fetchUnderReviewPosts() {
    const underReviewRef = ref(database, 'underReview'); // Reference to the underReview node
    return get(underReviewRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // Returns all posts under 'underReview'
        } else {
            console.error("No posts available under review");
            return null; // Ensure null is returned
        }
    }).catch((error) => {
        console.error("Error fetching under review posts: ", error);
        return null; // Ensure null is returned on error
    });
}

// Function to check posts and update if username matches (for active posts)
function checkAndUpdatePosts() {
    fetchPosts().then(posts => {
        if (posts) {
            // Loop through the posts
            for (let postKey in posts) {
                const post = posts[postKey];
                if (post.username === storedUsername) {
                    // If the username matches, update the post
                    const updatedPostData = {
                        description: post.description,
                    };
                    console.log(`Updating post: ${updatedPostData.description}`);

                    const HTML = `
                    <div class="post-item">
                        <h3 class="post-title">Active</h3>
                        <p class="post-description">${updatedPostData.description}</p>
                    </div>
                    `;
                    document.querySelector('.post-list')
                        .innerHTML += HTML;
                }
            }
        }
    });
}

// Function to check posts and update if username matches (for underReview posts)
function checkAndUpdateUnderReviewPosts() {
    fetchUnderReviewPosts().then(posts => {
        if (posts) {
            // Loop through the posts under 'underReview'
            for (let postKey in posts) {
                const post = posts[postKey];
                if (post.username === storedUsername) {
                    // If the username matches, add the post's HTML to the post list
                    const updatedPostData = {
                        description: post.description,
                    };
                    console.log(`Updating post: ${updatedPostData.description}`);

                    const HTML = `
                    <div class="post-item post-item-div">
                        <h3 class="post-title">Under Review</h3>
                        <p class="post-description">${updatedPostData.description}</p>
                    </div>
                    `;
                    document.querySelector('.under-review-list')
                        .innerHTML += HTML;
                }
            }
        }
    });
}

// Function to handle fetching user data and checking both types of posts on page load
window.onload = () => {
    // Fetch individual user data
    fetchUserData(storedUsername).then(userData => {
        if (userData) {
            // Display user information
            document.getElementById("firstnameNlastname")
                .innerHTML = `${userData.firstName} ${userData.lastName}`;
            document.getElementById("userName")
                .innerHTML = userData.username;
            document.getElementById("security-code")
                .innerHTML = userData.securityCode;
        }
    });

    // Check and update active posts
    checkAndUpdatePosts();

    // Check and update underReview posts
    checkAndUpdateUnderReviewPosts();
};
