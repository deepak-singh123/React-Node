import React, { useState } from 'react';
import './Registration.css'; 
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const formdata = new FormData();
    formdata.append('name',formData.name);
    formdata.append('dob',formData.dob);
    formdata.append('email',formData.email);
    formdata.append('password',formData.password);
    for (let [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }
        try{
     const response = await fetch('https://react-node-sqgq.onrender.com/user/register',{
       
        method:"POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(formData)    
        })
      
        if(response.ok){
      const result = await response.json();
      console.log("result=",result);
      setSubmitted(true);
          navigate("/login")
        }

    }
    catch(error){
      console.error("error during registration",error);
    }

  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <i className="fa-solid fa-user"></i>
            <span style={{ color: "white", margin: "0 8px" }}>|</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-calendar"></i>
            <span style={{ color: "white", margin: "0 8px" }}>|</span>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <span style={{ color: "white", margin: "0 8px" }}>|</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <span style={{ color: "white", margin: "0 8px" }}>|</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">REGISTER</button>
        </form>

        {submitted && (
          <div className="register-success">
            Registration Successful! 
          </div>
        )}
      </div>
    </div>
  );

};

export default Register;
