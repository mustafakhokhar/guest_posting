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



  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
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
        {/* <img src={`../upload/${post?.img}`} alt="" /> */}
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.writer_id}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.tag3}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.post_content),
          }}
        ></p>

          <button onClick = {() => Like(post)}> like : {post.totalLikes}</button>
          <button onClick = {() => Dis_Like(post)}>Dislike : {post.totalDislikes}</button>
          <button onClick = {() => report_handler(post)}> Report :{post.reportCount}<strong>{report_status}</strong> </button>
          {Comments(postId)}
        </div>

      
    </div>
  );
};

export default Single;
