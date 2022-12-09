import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


const Search = () => {
    
    const [search_word , set_search_k] = useState([])
    const [search_array , set_search_array ] = useState([])
    const [search_tag , set_search_t] = useState([])
    const [order , set_sorting_by ] = useState([])
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

    const likes = async() => {
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalLikes - a.totalLikes)
        set_search_array(sorted)
    }

    const dislikes = async() => {
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalDislikes - a.totalDislikes)
        set_search_array(sorted)
    }

    const engagement = async() => {
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalComments - a.totalComments)
        set_search_array(sorted)
    }

      
    return (
        <div>   
            <div className="search">
                <h1>HELLO BITCHES You are on the search page</h1>
                
                <input onChange={(e) => set_vals(e.target.value)}></input>
                <button onClick = {() => searchk()}> Search keyword</button>
                <button onClick = {() => searcht()}> Search tag</button>
                <button onClick = {() => likes()}> sort by likes</button>
                <button onClick = {() => dislikes()}> sort by dislikes</button>
                <button onClick = {() => engagement()}> sort by engagement</button>
            </div>
            <div>
                {search_array.map((result) => ( 
                <div>
                    <div className="content">
                        <br/>
                        <p> <strong>Writer:{result.writer_id}</strong> <br/> tags: {result.tag1} {result.tag2} {result.tag3}, <br/> content: {getText(result.post_content)}
                            <br/> Likes: {result.totalLikes} <br/> Dislikes: {result.totalDislikes} <br/> Total comments: {result.totalComments}
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