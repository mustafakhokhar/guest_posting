import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


const Search = () => {
    
    const [search_word , set_search_k] = useState(null)
    const [search_array , set_search_array ] = useState([])
    const [search_tag , set_search_t] = useState(null)
    const navigate = useNavigate();
    

    const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
    }

    const searchk = async() => {

        console.log("THE words are : ", search_word)
        try {

        const res = await axios.get(`/posts/searchk/${search_word}`);
        set_search_array(res.data)
        } catch (err){
          
        
          console.log(err)
        }
    }

    const searcht = async() => {

        console.log("THE tags are : ", search_tag)
        try {

        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res.data)
        } catch (err){
          
        
          console.log(err)
        }
    }

    const set_vals = (e) => {
        set_search_t(e);
        set_search_k(e);
    }

      
    return (
        <div>   
            <div className="search">
                <h1>HELLO BITCHES You are on the search page</h1>
                
                <input onChange={(e) => set_vals(e.target.value)}></input>
                <button onClick = {() => searchk()}> Search keyword</button>
                <button onClick = {() => searcht()}> Search tag</button>

            </div>
            <div>
                {search_array.map((result) => ( 
                <div>
                    <div className="content">
                        <br/>
                        <p> <strong>Writer:{result.writer_id}</strong> <br/> tags: {result.tag1} {result.tag2} {result.tag3}, <br/> content: {getText(result.post_content)}
                            <br/> Likes: {result.totalLikes} <br/> Dislikes: {result.totalDislikes}
                        </p>
                        <br/>
                    </div>
                </div>
            ))}
            </div>
        </div> 
    );

};

export default Search;