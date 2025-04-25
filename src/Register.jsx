import React, { useState } from 'react';
import './Registration.css'; 

const Register = () => {
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
     const response = await fetch('http://localhost:5000/user/register',{
        method:"POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(formData)    
        })

      const result = await response.json();
      console.log("result=",result);
    }
    catch(error){
      console.error("error during registration",error);
    }

    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {submitted && (
        <div className="success-message">
          Registration Successful!
        </div>
      )}
    </div>
  );
};

export default Register;
