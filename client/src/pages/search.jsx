import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


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
        if (search_word.length != 0){
            try {
            const res = await axios.get(`/posts/searchk/${search_word}`);
            set_search_array(res.data)
            } catch (err){
            console.log(err)
            }
        }
    }

    const searcht = async() => {
        if (search_tag.length != 0){
        console.log("THE tags are : ", search_tag)
        try {
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res.data)
        } catch (err){
          console.log(err)
        }
    }
    }

    const set_vals = (e) => {
        set_search_t(e);
        set_search_k(e);
    }

    const likes = async() => {
        if (search_tag.length != 0){
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalLikes - a.totalLikes)
        set_search_array(sorted)
        }
    }

    const dislikes = async() => {
        if (search_tag.length != 0){
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalDislikes - a.totalDislikes)
        set_search_array(sorted)
        }
    }


    const engagement = async() => {
        if (search_tag.length != 0){
        const res = await axios.get(`/posts/searcht/${search_tag}`);
        set_search_array(res)
        const sorted = [...search_array].sort((a,b) => b.totalComments - a.totalComments)
        set_search_array(sorted)
        }
    }

      
    return (
        <div className="home container-bg">   
            <div className="search">
                <h1>Search</h1>
                <div>
                <input className="SearchInput" onChange={(e) => set_vals(e.target.value)}></input>
                <button className="s1" onClick = {() => searchk()}> Search keyword</button>
                <button className="s1" onClick = {() => searcht()}> Search tag</button>
                </div>
                <button className="s2" onClick = {() => likes()}> sort by likes</button>
                <button className="s2" onClick = {() => dislikes()}> sort by dislikes</button>
                <button className="s2" onClick = {() => engagement()}> sort by engagement</button>
            </div>
            <div>
            <div className="posts">
                {search_array.map((result) => ( 
                <div className="post">
                    <div className="content">
                        <Link className="link" to={`/post/${result.post_id}`}>
                            <h2 className="title">{result.writer_id} </h2>
                            <p className="content">{getText(result.post_content)}</p>
                            <div>
                                <p>👍{result.totalLikes} 👎{result.totalDislikes} 💭{result.totalComments}</p>
                                <p className="tag">{result.tag2} {result.tag3}</p>
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

export default Search;