import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import ForgotPassword from "./pages/Forgotpass";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Polls from "./pages/Polls";
import Home from "./pages/Home";
import Single from "./pages/Single";
import SingleAdmin from "./pages/SingleAdmin";
import Admin from "./pages/admin";
import Search from "./pages/search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Users from "./pages/user";

import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};


const router = createBrowserRouter([ 
  {
    path: "/", 
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/polls",
        element: <Polls />,
      },
      {
        path: "/postApproval/:id",
        element: <SingleAdmin />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/user",
        element: <Users />,
      },
    ],
  },
  
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
