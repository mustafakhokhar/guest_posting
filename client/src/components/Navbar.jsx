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
          <h1>F-Society</h1>
        </div>
        <div>
        <span className="hello" >Hello 👋</span>
        <span className="username" >{currentUser?.username}</span>
        </div>
        <div className="links">
        <span className="adminRedirectioncss" onClick={isAdmin()? navigateToAdmin:undefined}>{currentUser?.status}</span>
          {currentUser ? 
          (<span className="logout" onClick={logout}>Logout</span>):
          (navigateTologin())
          }
          <span className="write-button">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          {/* <span className="write-button">
            <Link className="link" to="/polls">
              POLL
            </Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;