import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('api/v1/blogs');
    setBlogs(response.data);
  };

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Category: {blog.category}</p>
            <p>Text: {blog.text}</p>
            <p>Author: {blog.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
