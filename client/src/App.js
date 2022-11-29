import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import ForgotPassword from "./pages/Forgotpass";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

// making our paths via router
// --> normal get path 
// --> home page path 
// --> register path

const router = createBrowserRouter([ 
  {
    path: "/", 
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    path: "/ForgotPass",
    element: <ForgotPassword />,
  },
  {
    path: "/Write",
    element: <Write />,
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
