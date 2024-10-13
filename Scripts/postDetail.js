import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo
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

// Get postId from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('user');
console.log(postId);

// Get the post by postId
getPostById(postId).then((post) => {
    if (post) {
        const username = post.username; // Extract username from the post
        console.log(post);


        const postHTML = `
        <div class="post">
                <h2>${post.username}</h2>
                <p>${post.description}</p>
                <div class="likes-dislikes">
                    <span>Likes: ${post.likes}</span>
                    <span>Comments: 5</span>
                </div>
                <div>
                    <button class="like-button">Like</button>
                    <button class="comment-button">Comment</button>
                </div>
            </div>
        `


        document.querySelector('.posts').innerHTML += postHTML;





        // Fetch user info based on username
        getUserInfo(username).then((userInfo) => {
            if (userInfo) {
                console.log(userInfo); // Log user info for debugging

                // Update DOM with user details
                document.querySelector('.fullName').innerHTML = `${userInfo.firstName} ${userInfo.lastName}`;
                document.querySelector('.user-details').innerHTML = `
                    <span>Total Likes: ${userInfo.totalLikes}</span>
                    <span>Total Dislikes: ${userInfo.totalDislikes}</span>
                    <span>Total Points: ${userInfo.totalPoints}</span>
                    <span>Total Comments: ${userInfo.totalComments}</span>
                `;

                // Fetch all posts by this user
                getAllPostsByUser(username).then((posts) => {
                    if (posts && posts.length > 0) {
                        const userPostsDiv = document.getElementById('user-posts');
                        userPostsDiv.innerHTML = ''; // Clear previous posts

                        // Loop through all posts and add them to the DOM
                        posts.forEach(post => {
                            const postDiv = document.createElement('div');
                            postDiv.classList.add('post');
                            postDiv.innerHTML = `
                                <h2>${post.title}</h2>
                                <p>${post.content}</p>
                                <div class="likes-dislikes">
                                    <span>Likes: ${post.likes}</span>
                                    <span>Comments: ${post.comments}</span>
                                </div>
                                <div>
                                    <button class="like-button">Like</button>
                                    <button class="comment-button">Comment</button>
                                </div>
                            `;
                            userPostsDiv.appendChild(postDiv);
                        });
                    } else {
                        console.log("No posts found for this user.");
                    }
                }).catch(error => {
                    console.error("Error fetching posts for the user: ", error);
                });
            } else {
                console.error("User info not found for username: ", username);
            }
        }).catch(error => {
            console.error("Error fetching user info: ", error);
        });
    } else {
        console.error("Post not found for postId: ", postId);
    }
});

// Function to get all posts by a username
function getAllPostsByUser(username) {
    const postsRef = ref(database, 'posts');
    const postsQuery = query(postsRef, orderByChild('username'), equalTo(username));

    return get(postsQuery).then(snapshot => {
        const posts = [];
        console.log(username);
        snapshot.forEach(postSnapshot => {
            posts.push(postSnapshot.val()); // Push each post into the posts array
        });
        return posts;
    });
}

// Function to get post by postId
function getPostById(postId) {
    const postRef = ref(database, `posts/${postId}`);
    return get(postRef).then(snapshot => snapshot.val());
}

// Function to get user info by username
function getUserInfo(username) {
    const userRef = ref(database, `users/${username}`);
    return get(userRef).then(snapshot => snapshot.val());
}
