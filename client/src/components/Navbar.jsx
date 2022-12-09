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
          <p>OUR GUEST POSTING</p>
        </div>
        <div className="adminRedirectioncss">
        <span onClick={isAdmin()? navigateToAdmin:undefined}>{currentUser?.status}</span>
        </div>
        <div className="links">
          <span>{currentUser?.username}</span>
          {currentUser ? 
          (<span onClick={logout}>Logout</span>):
          (navigateTologin())
          }
          <span className="write-button">
            <Link className="link">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;