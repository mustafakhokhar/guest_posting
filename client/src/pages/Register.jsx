import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    password:"",
    question_1:"",
    question_2:"",
    question_3:"",
    state: "",
  });

  console.log(inputs)
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log(e)
    }
  };

  return (
    <div className="authentication">
      <form>
        <h1 className= "heading">Register Form</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />

        <input
          required
          type="text"
          placeholder="your name"
          name="name"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
         {/* <input
          required
          type="password"
          placeholder="confirm password"
          name="confirm - password"
          onChange={handleChange}
        /> */}

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
        <label name= "user_type">User type </label>
        <label name= "user_type">Reader </label>
        <input name='state' type='radio' value='reader' onChange={handleChange}/>
        <label name= "user_type">Writer</label>
        <input name='state' type='radio' value='writer' onChange={handleChange}/>




        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Already have an account, Click me!? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
