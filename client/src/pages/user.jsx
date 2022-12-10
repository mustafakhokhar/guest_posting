import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";



const Users = () => {

    const [search_array , set_search_array ] = useState([])
    const [banned_user , user_to_ban] = useState([])
    
    const get_users = async() => {

        console.log("THE words are : ")
        try {

        const res = await axios.get(`/postsApproval/users`);
        set_search_array(res.data)
        console.log(res.data)
        } catch (err){
          
        
          console.log(err)
        }
    }

    const ban_users = async() => {

        console.log("THE words are : ")
        try {
        console.log("SENDNG DATA")
        const res = await axios.post(`/postsApproval/banning/${banned_user}`);
        // get_users();
        console.log(res.data)
        } catch (err){
          
        
          console.log(err)
        }
    }

    const handleClick = (event, key, arr) => {
        console.log('key index: ', key);
        // console.log(arr[key].username)
        // let temp = arr[key].username
        user_to_ban(arr[key].username);
        console.log(banned_user)
        ban_users();
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            // console.log("YESS I M CALLEDDDDDDD")
            const res = await axios.get(`/postsApproval/users`);
            set_search_array(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      });
      
    return (
        <div >   
            <div >
              <div className="searchedPost">
                {search_array.map((result,key) => ( 
                <div >
                    <div>
                        <br/>
                        <div className="searchcontent"> 
                            <strong className="userN">Username: {result.username}</strong> <br/> 
                            <p className="userD"><strong> Fullname: </strong>{result.full_name}</p> <br/> 
                            <p className="userD"><strong> Status: </strong>{result.status}</p> <br/> 
                            <p className="userD"><strong> Number of reports: </strong>{result.total_reports}</p> <br/> 
                            <button className="banUserBut" onClick={event =>handleClick(event, key, search_array)}> <strong>Double Tap = Ban</strong></button>
                        </div>
                        <br/>
                    </div>
                </div>
            ))}
            </div>
            </div>
        </div> 
    );

};

export default Users;