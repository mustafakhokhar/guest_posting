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
    <div className="register">
      <form>
        <h1 className= "heading">F-Society</h1>
        <h3>Sign up to share knowledge with your friends.</h3>
        <div>
        <label>Username</label>
        <input
          type="text"
          placeholder="e.g hellcat007"
          name="username"
          onChange={handleChange}
          required
        />
        </div>

        <div>
        <label>Name of birth place.</label>
        <input
          type="text"
          placeholder="Question 1"
          name="question_1"
          onChange={handleChange}
          required
        />
        </div>

        <div>
        <label>Full Name</label>
        <input
          required
          type="text"
          placeholder="e.g Elon Musk"
          name="name"
          onChange={handleChange}
        />
        </div>

        <div>
        <label>Place where your parents met.</label>
        <input
          required
          type="text"
          placeholder="Question 2"
          name="question_2"
          onChange={handleChange}
        />
        </div>

        <div>
        <label>Password</label>
        <input
          required
          type="password"
          placeholder="e.g PDC_f00d$uck5"
          name="password"
          onChange={handleChange}
        />
        </div>

        <div>
        <label>Name of your best friend.</label>
        <input
          required
          type="text"
          placeholder="Question 3"
          name="question_3"
          onChange={handleChange}
        />
        </div>


        <label name= "user_type">User type: </label>

        <div></div>
        <label name= "user_type">Reader </label>
        <input name='state' type='radio' value='reader' onChange={handleChange}/>
        <label name= "user_type">Writer</label>
        <input name='state' type='radio' value='writer' onChange={handleChange}/>
        
        <button onClick={handleSubmit}>Register</button>
        <p>{err}</p>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
