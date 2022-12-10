// export default Navbar;
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateTologin = () => {
    // 👇️ navigate to /Login
    navigate('/login');
  };
  const navigateToAdmin = () => {
    // 👇️ navigate to /Login
    navigate('/admin');
  };
  const navigateToWrite = () => {
    // 👇️ navigate to /Login
    if (isWriter() == true) {
      navigate('/write');
    }
  };
  const navigateToSearch = () => {
    // 👇️ navigate to /Login
    navigate('/search');
  };
  
  const navigateToHome = () => {
    // 👇️ navigate to /Login
    navigate('/');
  };

  function isWriter(){
    if (currentUser?.status === 'writer'){
      return true
    }
    return false
  }

  function isAdmin(){
    if (currentUser?.status === 'admin'){
      return true
    }
    return false
  }
  const { currentUser,logout,} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <h1 onClick={navigateToHome}>F-Society</h1>
        </div>
        <div>
        <span className="hello" >Hello 👋</span>
        <span className="username" >{currentUser?.username}</span>
        </div>
        <div className="links">
        <span className="adminRedirectioncss" onClick={navigateToSearch}>🔍Search</span>
        <div>
        </div>
        <span className="adminRedirectioncss" onClick={isAdmin()? navigateToAdmin:navigateToWrite}>{currentUser?.status}</span>
          {currentUser ? 
          (<span className="logout" onClick={logout}>Logout</span>):
          (navigateTologin())
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;