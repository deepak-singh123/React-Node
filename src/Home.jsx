
import {useNavigate} from 'react-router-dom'
  const  Home =()=>{
const navigate =useNavigate()

    const logout = ()=>{
      localStorage.removeItem("token");
      navigate("/login")

    }

    return(
        <>
       Home

       <button onClick={logout}>Logout</button>
        </>
    )
} 
  


export default Home;