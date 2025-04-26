import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './register'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'


function App() {
 /* useEffect(()=>{
    try{
      const response = fetch("http://localhost:5000/user/data",{
        method:"GET",
        credentials:"include"
      })

      if(response.ok){
        const userdata = response.json()
        console.log(userdata);
      }
    }
    catch(e){
      console.log(e);
    }
  },[])
*/

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>,
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </Router>
     
     
    </>
  )
}

export default App
