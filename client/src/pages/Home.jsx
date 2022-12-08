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





  const cat = useLocation().search

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



  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    
    <div className="home container-bg">
      <div className="posts">
        {posts.map((post) => ( 
          <div className="post" key={post.post_id}>
            {/* <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div> */}
            <div className="content">
              <Link className="link" to={`/post/${post.post_id}`}>
                <h1>{post.tag3}</h1>
              </Link>
              <p>{getText(post.post_content)}</p>
               {/* <Link className="link" to={`/post/${post.id}`}>
                <button>Read more</button>Hello wordlsss
              </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    
};

export default Home;


// /*

// <div className="home">
//        <h1>homeeee</h1>
//       <div className="posts">
//         {posts.map((post) => (
//           <div className="post" key={post.id}>
//             <div className="img">
//               {/* <img src={`../upload/${post.img}`} alt="" /> */}
//               </div>
//               <h4>wrote by : {post.writer_id}</h4>
//               <div className="content">
//                 <Link className="link" to={`/post/${post.id}`}>
//                   <h1>{post.tag3}</h1>
//                 </Link>
//                 <p>{getText(post.post_content)}</p>
//                 <button>Read More</button>
//                 <button onClick = {() => Like(post)}> like : {post.totalLikes}</button>
//                 <button onClick = {() => Dis_Like(post)}>Dislike : {post.totalDislikes}</button>
//                 <button onClick = {() => report_handler(post)}> Report : <strong>{report_status}</strong> </button>
//                 {/* <button onClick = {Like}></button> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>















// */
