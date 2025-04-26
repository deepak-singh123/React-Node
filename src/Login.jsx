import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom"



const Login = () => {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesignin = ()=>{
    navigate("/register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:"include",

        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.User_details)); 
        localStorage.setItem("token", result.token);
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(result.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error, try again later.');
    }
  };

  return (
   


    <div className="login-container">
      <div className="login-card">
       <div className='signin-btn'>
         <button className="login-title" onClick={()=>handlesignin()}>SIGN IN</button>
       </div>
        <div className="profile-pic"></div>
        <div className='form-box'>
        <form  onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
          <i className="fa-solid fa-user"></i> 
          <span style={{ color: "white", margin: "0 8px" }}>|</span>

            <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required 
          />
          </div>
          
          <div className="input-group">
          <i className="fa-solid fa-lock"></i> 
          <span style={{ color: "white", margin: "0 8px" }}>|</span>
            <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            required 
          />
          </div>

          <div className="options">
          <div className="remember-me">
  <input type="checkbox" id="remember" />
  <label htmlFor="remember">Remember Me</label>
</div>


            <a href="#">Forgot your password?</a>
          </div>

          <button  type="submit" className="login-btn">LOGIN</button>
        </form>
        </div>
      </div>
      {message && <div className="login-message">{message}</div>}
    </div>
  );
};


 
  


export default Login;
