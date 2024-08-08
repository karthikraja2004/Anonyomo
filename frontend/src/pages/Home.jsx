import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Anonymo</h1>
      <div className="home-buttons">
        <Link to="/register" className="home-btn">Register</Link>
        <Link to="/login" className="home-btn">Login</Link>
      </div>
    </div>
  );
};

export default Home;
