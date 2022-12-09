import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext";



const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [tag1, setTag1] = useState(state?.desc || "");
  const [tag2, setTag2] = useState(state?.desc || "");
  const [tag3, setTag3] = useState(state?.desc || "");
  const [my_posts , set_my_posts] = useState([])
  // user id :

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  const usersname= currentUser.username

  const handleClick = async (e) => {
    e.preventDefault();



  
    try {
      
        await axios.post(`/posts/`, {
            desc: value,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            usersname,
            tag1,
            tag2,
            tag3,
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const search_posts = async (e) => {

    console.log("yesss",usersname)
    try {

    const res = await axios.get(`/posts/my_posts/${usersname}`);
    set_my_posts(res.data)
    } catch (err){
        console.log(err)
    }

  };
  
  return (
  <div>
    <div className="add">
      <div className="content">
        <button className="pollbutton"> 
        <Link className="link" to="/polls">
              CREATE POLL
            </Link>
        </button>
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <input
          type="text"
          placeholder="Tag1"
          onChange={(e) => setTag1(e.target.value)}
        />
         <input
          type="text"
          placeholder="Tag2"
          onChange={(e) => setTag2(e.target.value)}
        />
         <input
          type="text"
          placeholder="Tag3"
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

    </div >
    <div className="view_post_button">
    <h2 >View My Posts</h2>
    <button onClick={search_posts}>View my posts</button>
    </div>
    {/*  Printing user posts :  */}
    <div className="view_my_posts">
            {my_posts.map((post) => ( 
            <div>
                <div>
                <div>
                    {/* <p>{comment.username}</p> */}
                    <p> <strong>{post.tag1} : </strong></p>
                    <p
                      dangerouslySetInnerHTML={{
                       __html: DOMPurify.sanitize(post.post_content),
                      }}
                    ></p>
                </div>
                </div>
            </div>
        ))}
      </div>
  </div>
  );
};

export default Write;
