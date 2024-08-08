import React, { useState } from 'react';
import axios from 'axios';
import './auth.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate=useNavigate();
  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5500/api/login', body,config);
      toast.success('User logged in successfully!');
      console.log('User logged in:', res.data);
      setFormData({
        email: '',
        password: '',
    });
      localStorage.setItem('jwt',res.data.token);
      navigate('/dashboard');
    }
     catch (err) {
      toast.error('Login failed:'+(err.response?.data.message|| 'Unknown error'));
      console.error('Login error:', err.response.data);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
