import React, { useState, useEffect } from 'react';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async id => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      const data = await response.json();
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === data.id) {
          return data;
        } else {
          return blog;
        }
      });
      setBlogs(updatedBlogs);
      setSelectedBlog(null);
      setUpdatedBlog({});
      alert('Blog post updated!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:3000/api/v1/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter(blog => blog.id !== id));
      alert('Blog post deleted!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = blog => {
    setSelectedBlog(blog);
    setUpdatedBlog({
      title: blog.title,
      category: blog.category,
      text: blog.text,
      author: blog.author,
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdatedBlog({ ...updatedBlog, [name]: value });
  };

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs &&
          blogs.map(blog => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>Category: {blog.category}</p>
              <p>Text: {blog.text}</p>
              <p>Author: {blog.author}</p>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
              <button onClick={() => handleEdit(blog)}>Edit</button>
            </li>
          ))}
      </ul>
      {selectedBlog && (
  <form>
    <h2>Edit Blog Post</h2>
    <label>
      Title:
      <input type="text" name="title" value={updatedBlog.title} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Category:
      <input type="text" name="category" value={updatedBlog.category} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Text:
      <input type="text" name="text" value={updatedBlog.text} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Author:
      <input type="text" name="author" value={updatedBlog.author} onChange={handleInputChange} />
    </label>
    <br />
    <button type="button" onClick={() => handleUpdate(selectedBlog.id, updatedBlog)}>Save</button>
    <button type="button" onClick={() => setSelectedBlog(null)}>Cancel</button>
  </form>
)}
</div>)}

export default BlogList
