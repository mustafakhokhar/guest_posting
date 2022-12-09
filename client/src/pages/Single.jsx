import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Comments from "./comments";



const Single = () => {
  const [post, setPost] = useState({});
  const [post_likes , setPostLikes] = useState(0)

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  // console.log(location.pathname.split("/"))
  const { currentUser } = useContext(AuthContext);
  const [report_status , set_report_status] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("YESS I M CALLEDDDDDDD")
        const res = await axios.get(`/posts/${postId}`);
        // console.log(res.data)
        // console.log("POST ID : ", postId)
        // console.log("in fetch data")
        setPostLikes(res.data.totalLikes)
        setPost(res.data);
        // console.log("YOUR TOTAL LIKES : ",post_likes)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // console.log("yess!!!!!!!!!!!!")
  }, [post]);




// READER FUNCTIONALITY : 




  const Like = async(post) => 
  {
    // console.log(post)
    try {
      // post.totalLikes = post.totalLikes + 1
      const post_array = [post , currentUser]
      const res = await axios.post(`/posts/update_like` , post_array);
    } catch (err){
      console.log("err : " , err)
    }
    
  }

  const Dis_Like = async(post) => 
  {
    // console.log(post)
    try {
      // post.totalDislikes = post.totalDislikes + 1
      const post_array = [post , currentUser]
      const res = await axios.post(`/posts/update_dislike` , post_array);
    } catch (err){
      console.log("err : " , err)
    }
    
  }

  const report_handler = async(post) => {

    try {
      // post.totalLikes = post.totalLikes + 1
      const post_array = [post , currentUser]
      const res = await axios.post(`/posts/update_report_status` , post_array);
      set_report_status(res.data.message)
      console.log(post)
    } catch (err){
      
      console.log(err)
      // set_report_status(err.response.data)

    }
  }


  const deletepostid= postId
  const usersname= currentUser.username
  const handleDelete = async (post)=>{
    try {
      const array= [deletepostid,usersname ]
      console.log("This is the stuff deleting:", array)
      await axios.post(`/posts/${postId}`,array);
      navigate("/")
    } catch (err) {
      console.log("Throwing error")
      console.log(err);
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
          <div className="buttonsSingle">
          <button className = "button" onClick = {() => Like(post)}> 👍UpVote : {post.totalLikes}</button>
          <button className = "button" onClick = {() => Dis_Like(post)}>👎DownVote : {post.totalDislikes}</button>
          <button className = "button" onClick = {() => report_handler(post)}> 🚩Reports:{post.reportCount}<strong>{report_status}</strong> </button>
          <button className = "button" onClick={() => handleDelete(post)}>Delete</button>
          </div>
          {Comments(postId)}
        </div>
    </div>
  );
};

export default Single;
