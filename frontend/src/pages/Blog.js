// src/pages/Blog.js
import React, { useEffect, useState } from 'react';
import blogService from '../services/blogservice'; // Import the blogService// Assuming you have a service to fetch blog posts

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    blogService.getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h1>Church Blog</h1>
      {posts.length ? (
        posts.map(post => (
          <div key={post.id} className="blog-post">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button>Read More</button>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default Blog;
