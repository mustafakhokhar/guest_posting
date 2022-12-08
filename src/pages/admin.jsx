import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
    
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    
    const navigateTohome = () => {
        console.log("WAS HERE")
        navigate('/');
      };

      
    
    const handleposts = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/auth/Admin");
        } catch (err) {
          console.log("NOOOO!!!")
          setError(err.response.data);
          console.log(e)
        }
    }

    return (
        <div className="admin">
            <h1>HELLO BITCHES</h1>
            <button onClick={handleposts}>post apporval</button>
            <button onClick={handleposts}>ban user</button>
            <h2>Printing in console</h2>
            <button onClick={navigateTohome()}>HOME</button>
        </div>
    );

};

export default Admin;