import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import {ToastContainer} from 'react-toastify';
import Navbar from './pages/Navbar';
const App=()=>{
    return(
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/navigatebar" element={<Navbar/>}/>
                </Routes>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        </Router>

    );
};
export default App;
