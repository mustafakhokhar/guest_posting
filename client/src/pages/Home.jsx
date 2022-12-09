import React ,  { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  
  const { currentUser, logout } = useContext(AuthContext);
  const [report_status , set_report_status] = useState(null)

  const Like = async(post) => 
  {
    console.log(post)
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
    console.log(post)
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
    } catch (err){
      
      console.log(err)
      // set_report_status(err.response.data)

    }
  }

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get(`/posts`);
        console.log(res.data)
        console.log("yess")
        setPosts(res.data);
        
      } catch (err) {
        // setError(err.response.data);
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
    
    <div className="home container-bg">
      <div className="posts">
        {posts.map((post) => ( 
          <div className="post" key={post.post_id}>
            <div className="content">
              <h2>{post.tag1} </h2>
            <Link className="link" to={`/post/${post.post_id}`}>
              <p>{getText(post.post_content)}</p>
              </Link>
                <p>{post.tag2} {post.tag3}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    
};

export default Home;