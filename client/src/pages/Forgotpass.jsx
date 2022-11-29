import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext";

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    username: "",
    question_1: "",
    question_2: "",
    question_3: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  // const { ForgotPassword } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/Forgotpass", inputs);
      navigate("/");
    } catch (err) {
      console.log("yessss!!!")
      setError(err.response.data);
      console.log(e)
    }
  };
  return (
    <div className="login">
      <h1>ForgotPassword</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <label>Name of birth place</label>
        <input
          required
          type="text"
          placeholder="Question 1"
          name="question_1"
          onChange={handleChange}
        />
        <label>Place where your parents first met</label>
        <input
          required
          type="text"
          placeholder="Question 2"
          name="question_2"
          onChange={handleChange}
        />
        <label>Name of your best friend</label>
        <input
          required
          type="text"
          placeholder="Question 3"
          name="question_3"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>ForgotPassword</button>
        {err && <p>{err}</p>}
        <span>
          Sign in again <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;