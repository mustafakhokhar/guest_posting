import React ,  { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  
  const { currentUser, logout } = useContext(AuthContext);
  const [approval_status , set_approval_status] = useState(null)

  const approval_handler = async(post) => {
    try {
      const post_array = [post , currentUser]
      const res = await axios.post(`/postsApproval/updateApprovalStatus` , post_array);
      set_approval_status(res.data.message)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get(`/postsApproval`);
        console.log(res.data)
        console.log("yess")
        setPosts(res.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  },[]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div>
        <div className="banUser">
            <Link to="/user"><p className="adminRedirectioncss">Ban Users</p></Link>
        </div>
        <div className="unappPost" >
        <p >Unapproved Posts</p>
        </div>
        <div className="home">
        <div className="posts">
          {posts.map((post) => ( 
            <div className="post" key={post.post_id}>
              <div className="content">
                <Link className="link" to={`/postApproval/${post.post_id}`}>
                <h2 className="title">{post.writer_id} </h2>
                <p className="content">{getText(post.post_content)}</p>
                <div className="adminatagu">
                <p className="approv">Click to Approve</p>
                <p className="tag">{post.tag2} {post.tag3}</p>
              </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
    
};

export default Admin;
