import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <p>OUR GUEST POSTING</p>
        </div>
        <div className="links">
          
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write-button">
            <Link className="link" to="/Write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;