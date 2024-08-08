import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        mobile:'',
        username:'',
        collegeName:'',
        dob:'',
    });
   
    const {name,email,mobile,password,confirmPassword,username,collegeName,dob}=formData;
    
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const navigate = useNavigate(); 
    const onSubmit=async e=>{
      e.preventDefault();

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }

      try{
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
      const body=JSON.stringify({name,email,mobile,password,confirmPassword,username,collegeName,dob});
      const res=await axios.post('http://localhost:5500/api/signup',body,config);
      toast.success('User registered Successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        username: '',
        collegeName: '',
        dob: '',
    });
     
      console.log('User registered:',res.data);
      navigate('/login');
      }
      catch(err){
        toast.error('Registration failed: ' + (err.response?.data.message || 'Unknown error'));
        console.error('Registration error:', err.response.data);
      } 
    };
   

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="register-form">
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={onChange}
            required
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter the password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            placeholder="confirm Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="collegeName">College Name:</label>
          <select
            id="collegeName"
            name="collegeName"
            value={collegeName}
            onChange={onChange}
            required          
          >
            <option value="" disabled>Select your college</option>
            <option value="saveetha">Saveetha</option>
            
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateofBirth">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={onChange}
            required
          />
          </div>
          <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>
  );
};

export default Register