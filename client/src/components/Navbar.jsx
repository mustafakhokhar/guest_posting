// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/authContext";
// import Logo from "../img/logo.png";

// const Navbar = () => {
//   const { currentUser, logout } = useContext(AuthContext);

//   return (
//     <div className="navbar">
//       <div className="container">
//         <div className="logo">
//           <Link to="/">
//           <img src={Logo} alt="" />
//           </Link>
//         </div>
//         <div className="links">
//           <Link className="link" to="/?cat=art">
//             <h6>ART</h6>
//           </Link>
//           <Link className="link" to="/?cat=science">
//             <h6>SCIENCE</h6>
//           </Link>
//           <Link className="link" to="/?cat=technology">
//             <h6>TECHNOLOGY</h6>
//           </Link>
//           <Link className="link" to="/?cat=cinema">
//             <h6>CINEMA</h6>
//           </Link>
//           <Link className="link" to="/?cat=design">
//             <h6>DESIGN</h6>
//           </Link>
//           <Link className="link" to="/?cat=food">
//             <h6>FOOD</h6>
//           </Link>
//           <span>{currentUser?.username}</span>
//           {currentUser ? (
//             <span onClick={logout}>Logout</span>
//           ) : (
//             <Link className="link" to="/login">
//               Login
//             </Link>
//           )}
//           <span className="write">
//             <Link className="link" to="/write">
//               Write
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

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