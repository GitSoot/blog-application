import React, { useState } from 'react';
import axios from 'axios';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const blog = {
      title,
      category,
      text,
      author
    };

    await axios.post('/blogs', blog);

    setTitle('');
    setCategory('');
    setText('');
    setAuthor('');

    alert('Blog post created!');
  };

  return (
    <div>
      <h2>Add a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea id="text" value={text} onChange={e => setText(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default BlogForm;
