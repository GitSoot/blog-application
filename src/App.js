import React from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import 'react-bootstrap';

function App() {
  return (
    <div>
      <BlogForm />
      <BlogList />
    </div>
  );
}

export default App;
