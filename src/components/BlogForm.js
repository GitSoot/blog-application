import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    await fetch('http://localhost:3000/api/v1/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
    });

    setTitle('');
    setCategory('');
    setText('');
    setAuthor('');

    alert('Blog post created!');
  };

  return (
    <div className="container">
    <h2>Simple Blog Application</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter category" value={category} onChange={e => setCategory(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" placeholder="Enter text" value={text} onChange={e => setText(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Enter author" value={author} onChange={e => setAuthor(e.target.value)} required />
      </Form.Group>
      <Button type="submit">Create Post</Button>
    </Form>
  </div>
  );
}

export default BlogForm;
