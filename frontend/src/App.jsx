import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import CreatePost from './components/CreatePost/CreatePost';
import PostDetail from './components/PostDetail/PostDetail';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5500';
const App = () => {

  const isAuthenticated = () => !!localStorage.getItem('jwt');
  
  return (
   
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {isAuthenticated() ? (
            <>
              <Route path="/feed" element={
                <>
                  <Navbar /> 
                  <Feed />
                </>
              } />
              <Route path="/create-post" element={
                <>
                  <Navbar /> 
                  <CreatePost />
                </>
              } />
             <Route path="/profile" element={
                <>
                  <Navbar /> 
                  <Profile/>
                </>
              } />
              <Route path="//feed/:collegeName" element={
                <>
                  <Navbar /> 
                  <Feed/>
                </>
              } />
              <Route path="/posts/:postId" element={<PostDetail />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
};

export default App;
