// import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({});
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="test"
          placeholder="Name of birth place"
          name="Name of birth place"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Reset Password</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  );
};

export default Login;
