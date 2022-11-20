import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  
  

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="home">
      
      <div className="posts">
        <h4>Post 1</h4>
        <h4>Author: Maaz Awaiz</h4>
        <p>Welcome guys!!</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h2><br></br></h2>

        <h4>Post 2</h4>
        <h4>Author: Nameer </h4>
        <p>I LOVE RIHANNA!!!!</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h4> </h4>

        <h2><br></br></h2>

        <h4>Post 3</h4>
        <h4>Author: Mustafa Khokhar</h4>
        <p>Mitochondria is the powerhouse of a cell</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h2><br></br></h2>



        <h4>Post 4</h4>
        <h4>Author: Azmeer</h4>
        <p>OK</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h2><br></br></h2>


        <h4>Post 5</h4>
        <h4>Author: Shazer</h4>
        <p>I am very happy today!!!!!!!</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h2><br></br></h2>


        <h4>Post 6</h4>
        <h4>Author: Maaz Awaiz</h4>
        <p>I am very happy today!!!!!!!</p>
        <div className ="btn">
         <p> <button>LIKE</button>
            <button>DISLIKE</button>
            <button>Comment</button>
           
          </p>
        </div>
        <h2><br></br></h2>
      </div>
    </div>
  );
};

export default Home;