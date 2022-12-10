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


const Comments = (post_id) => {

    // creating commment array hook :

    const { currentUser, logout } = useContext(AuthContext);
    const [comment_array , set_comment_array ] = useState([])
    const [comment_msg , set_comment_msg] = useState(null)

    // function for posting the new comment into the array & adding into the array 

    const comment_adder = async() => {

        console.log("THE MSG IS : ", comment_msg)
        console.log("POST ID : ",post_id)
        try {
          
          const single_cmd_obj = [comment_msg , currentUser ,post_id]
          console.log(single_cmd_obj)
          const res = await axios.post(`/posts/add_comment` , single_cmd_obj);
        //   set_report_status(res.data.message)

        } catch (err){
          
        
          console.log(err)
          // set_report_status(err.response.data)
    
        }
      }



    // USE EFFECTS :

    useEffect(() => {
      const fetchData = async () => {
  
        try {
          const res = await axios.get(`/posts/get_comments/${post_id}`);
          // console.log(res.data)
          set_comment_array(res.data)
          
        } catch (err) {
          // setError(err.response.data);
          console.log(err)
        }
      };
  
      fetchData();
    },[comment_array]);




    const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
    }



    return (
        <div>
          <div>.</div>
          <div className="commentInpu">
          <input className ="comment_input" onChange={(e) => set_comment_msg(e.target.value)}></input>
          <button className = "comment_button" onClick = {() => comment_adder()} > ✍️ Comment </button>
          </div>
            {comment_array.map((comment) => ( 
            <div>
                <div className="comment" >
                <div className="cmt">
                    <p className="DisplayComment"> <strong className="usrnameCommentDisplay">{comment.username} :   {getText(comment.comment_content)}</strong></p>
                </div>
                </div>
            </div>
        ))}
        </div>
        )

}

export default Comments;