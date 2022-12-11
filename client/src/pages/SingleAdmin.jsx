import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Comments from "./comments";



const SingleAdmin = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const [approval_status , set_approval_status] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/postsApproval/${postId}`);
        setPost(res.data);
        set_approval_status(res.data.admin_approval_status)
      } catch (err) {
        console.log("Error:",err);
      }
    };
    fetchData();
  }, [post]);

  const navigateBack = () => {
    // 👇️ navigate to /Login
    navigate(-1);
  };

  const approval_handler = async(post) => {
    try {
      // post.totalLikes = post.totalLikes + 1
      const post_array = [post , currentUser]
      console.log("FUCKIng")
      navigateBack()
      const res = await axios.post(`/postsApproval/updateApprovalStatus` , post_array);
      console.log("POSTTT:",post)
      console.log("RESSS:",res.data)
    } catch (err){
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <div className="user">
          <div className="repo">
          </div>
              <div className="userSingle">
                <span>{post.writer_id}</span>
              </div>
        </div>
        
        <p className="postContent"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.post_content),
          }}
        ></p>
        <h1 className="tagsSingle">{post.tag1}   {post.tag2}   {post.tag3}</h1>
        <div className="buttonsSingle"></div>
          <button onClick = {() => approval_handler(post)}> APPROVE </button>
        </div>
    </div>
  );
};

export default SingleAdmin;
