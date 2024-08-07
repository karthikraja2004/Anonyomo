import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        mobile:'',
        username:'',
        collegeName:'',
        dateofBirth:'',
    });
    const [colleges,setColleges]=useState([]);
    const {name,email,mobile,username,collegeName,dateofBirth}=formData;
    useEffect(()=>{
      const fetchColleges=async()=>{
        try{
          const res=await axios.get('http://localhost:3000/api/colleges/list');
          setColleges(res.data);
        }
        catch(err)
        {
           console.error(err);
        }
      };
      fetchColleges();
    },[]);

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async e=>{
      e.preventDefault();
      const body=JSON.stringify({name,email,mobile,username,collegeName,dateofBirth});
      console.log(body);
      try{
        const res=await axios.post('http://localhost:3000/register',body);
        console.log(res.data);
      }
      catch(err){
        console.error(err.response.data);
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
            {colleges.map((college,index)=>(
              <option key={index} value={college}>{college}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateofBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofBirth"
            name="dateofBirth"
            value={dateofBirth}
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