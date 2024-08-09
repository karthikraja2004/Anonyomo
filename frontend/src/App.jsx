import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import CreatePost from './components/CreatePost/CreatePost';

const App = () => {
  const isAuthenticated = true; // replace with your actual authentication check logic

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/feed"
            element={
              isAuthenticated ? (
                <>
                  <Feed />
                  <div className="create-post-container">
                    <CreatePost />
                  </div>
                </>
              ) : (
                <Login />
              )
            }
          />

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
