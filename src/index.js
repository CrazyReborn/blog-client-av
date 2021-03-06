import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostLarge from './components/postLarge';
import Navbar from './components/navbar';
import Login from './components/login';
import Logout from './components/logout';
import NewPostForm from './components/newPostForm';

ReactDOM.render(
  <BrowserRouter>
  <Navbar />
    <Routes>
        <Route path='/' element={<App />} />
          <Route path='posts/:id' element={<PostLarge />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='newpost' element={<NewPostForm />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);