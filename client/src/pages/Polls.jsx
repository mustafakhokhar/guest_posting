import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";



const Polls = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [option1, setTag1] = useState(state?.desc || "");
  const [option2, setTag2] = useState(state?.desc || "");
  const [option3, setTag3] = useState(state?.desc || "");


  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  const usersname= currentUser.username

  const handleClick = async (e) => {
    e.preventDefault();

  
    try {
      
        await axios.post(`/posts/addPoll`, {
            title,
            // desc: value,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            usersname,
            option1,
            option2,
            option3,
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
      <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div> */}
        <input
          type="text"
          placeholder="Poll Option 1"
          onChange={(e) => setTag1(e.target.value)}
        />
         <input
          type="text"
          placeholder="Poll Option 2"
          onChange={(e) => setTag2(e.target.value)}
        />
         <input
          type="text"
          placeholder="Poll Option 3"
          onChange={(e) => setTag3(e.target.value)}
        />
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          
          
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Polls;
