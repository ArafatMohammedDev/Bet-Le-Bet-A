import {posts} from '../Data/posts.js'
let posted;

posts.forEach((post)=>{
    posted += `
    <div class="post">
          <div class="userInfo">
            <i class="fa-solid fa-user"></i>
            <h1 class="name">${post.name}</h1>
            <p>Posted ${post.dayJs} ago</p>
          </div>
          <div class="description">
              ${post.description}
              <a href="#">More...</a>
            </div>
    </div>
    `

});
document.querySelector('.content-ab')
    .innerHTML = posted;