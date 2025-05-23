import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Register'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'


function App() {
 const [userdata,setuserdata] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://react-node-sqgq.onrender.com/user/data", {
          method: "GET",
          credentials: "include"
        });

        if (response.ok) {
          const result = await response.json();  
          console.log("Result=",result);
          setuserdata(result);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();  
  }, []);

  return (
    <>
      {Object.keys(userdata).length === 0 ? (
        <p>Loading... Please wait atleat 1 minute</p>  
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home userdata={userdata} /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
  
}

export default App
