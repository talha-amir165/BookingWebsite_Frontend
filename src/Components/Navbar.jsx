import React from 'react'
import './Navbar.css'

import { useNavigate,Link } from "react-router-dom";
import userService from "../Services/UserService";

function Navbar() {
  //const { user,dispatch} = useContext(AuthContext);
  const navigate =useNavigate();
  

  return (
    <div className='Navbar'>

        <div className="navContainer">
            <span className="logo">
               Talha Booking
            </span>
          {userService.isLoggedIn()?<div>{userService.getLoggedInUser().username} <button className='NavButton' onClick={(e) => {
              userService.logout();
              window.location.reload();
            }}>Logout</button>{userService.isAdmin()&&<Link to='/admin'><button className='NavButton'>Admin Panel</button></Link>} </div>: <div className="navItems">
             <Link to="/register">   <button className="NavButton">Register</button> </Link> 
                <Link to ="/login"><button className="NavButton">Login</button></Link>
              
            </div>
}
        </div>
    </div>
  )
}

export default Navbar