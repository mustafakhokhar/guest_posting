import { db } from "../db.js";
import jwt from "jsonwebtoken";



function unixTimestamp (date = Date.now()) {  
  return Math.floor(date / 1000)
}


export const getPosts = (req, res) => {
  const q =  "Select * from posts";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};


export const getPost = (req, res) => {
  const q =  "SELECT * FROM POSTS WHERE post_id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};


export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};


export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      return res.json("Post has been deleted!");
    });
  });
};


export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  }); 
};


export const update_like = (req, res) => {
  const post_details = req.body[0]
  const user_details = req.body[1]
  var new_likes = post_details.totalLikes 
  var new_dislikes = post_details.totalDislikes
  const post_id = post_details.post_id
  const user_name = user_details.username
  const has_table_query = `Select * from user_has_liked where username = "${user_name}" and post_id = ${post_id}`
  const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
  db.query(has_table_query, (err, data) => {
    if (err) {
    }
    else {
      if(data.length >0)
      {
        if (data[0].isLiekd == 0){ // means that person first disliked it first but now wanna like it :
          new_likes = new_likes + 1
          new_dislikes = new_dislikes - 1
          const update_has_table = `Update user_has_liked set isLiekd = ${1} where post_id = ${post_id} and username = "${user_name}"`
          db.query( update_has_table , (err , data)=>{
            if (err) return res.status(500).json(err);
            else{
              const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
              db.query(sample_query, (err, data) => {
              if (err) return res.status(500).json(err);
            });
            } 

          })
        }
      }
      else // if the user is liking for the first time !
      {
        const insert_has_query = `insert into user_has_liked values ("${user_name}" , "${1}" , "${post_id}")`
        db.query(insert_has_query, (err, data) => {
          if (err) {return res.status(500).json(err)}
          else
          {
            new_likes = new_likes + 1
            const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
            db.query(sample_query, (err, data) => {
              if (err) return res.status(500).json(err);
            });
          } 
        });
      }
    }
    return res.json("Post has been updated.");
  });
};


export const update_dislike = (req, res) => {
  const post_details = req.body[0]
  const user_details = req.body[1]
  var new_likes = post_details.totalLikes 
  var new_dislikes = post_details.totalDislikes
  const post_id = post_details.post_id
  const user_name = user_details.username
  const has_table_query = `Select * from user_has_liked where username = "${user_name}" and post_id = ${post_id}`
  const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
  db.query(has_table_query, (err, data) => {
    if (err) {
    }
    else {
      if(data.length >0)
      {
        if (data[0].isLiekd == 1){ // means that person first disliked it first but now wanna like it :
          new_likes = new_likes - 1
          new_dislikes = new_dislikes + 1
          const update_has_table = `Update user_has_liked set isLiekd = ${0} where post_id = ${post_id} and username = "${user_name}"`
          db.query( update_has_table , (err , data)=>{
            if (err) return res.status(500).json(err);
            else{
              const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
              db.query(sample_query, (err, data) => {
              if (err) return res.status(500).json(err);
            });
            } 
          })
        }
      }
      else // if the user is disliking for the first time !
      {
        const insert_has_query = `insert into user_has_liked values ("${user_name}" , "${0}" , "${post_id}")`
        db.query(insert_has_query, (err, data) => {
          if (err) {return res.status(500).json(err)}
          else
          {
            new_dislikes = new_dislikes + 1
            const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
            db.query(sample_query, (err, data) => {

              if (err) return res.status(500).json(err);
            });
          } 
        });
      }
    }
    return res.json("Post has been updated.");
  });

};


export const update_report_status = (req ,res) =>{
  const post_details = req.body[0]
  const user_details = req.body[1]
  var total_reports = post_details.reportCount
  const post_id = post_details.post_id
  const user_name = user_details.username
  const new_report_count = post_details.reportCount + 1
  const has_table_query = `Select * from user_has_reported where username = "${user_name}" and post_id = ${post_id}`
  const error_msg = " You have already reported this post !" ; const error_msg_2 = "Post does not exist for which you are reporting !"
  db.query(has_table_query, (err, data) => {
    if (err) {
      console.log("no such post for report !")
    }
    else {
      if(data.length >0)
      {
        res.json({message : error_msg}) 
      }
      else // if the user is reporting for the first time !
      {
        const insert_has_query = `insert into user_has_reported values ("${user_name}" , "${post_id}")`
        const insert_report_query = `Update posts set reportCount = ${new_report_count} where post_id = ${post_id}  `
        db.query(insert_has_query, (err, data) => {
          if (err) {return res.status(500).json(err)}
          else {
            db.query(insert_report_query, (err, data) => {
              if (err) {return res.status(500).json(err)}
              else {
                console.log("done successfully!")
              }
            })
          }
        })
      }
    }
  });
};


export const add_comment = (req , res) => {
  console.log(req.body)
  var user_name = req.body[1].username
  var post_id = req.body[2]
  var comment_msg = req.body[0]
  var time = unixTimestamp()
  const comment_insert_query = `Insert into comments (post_id , comment_content , username , created_time) values (${post_id} , '${comment_msg}' , '${user_name}' , ${time})`
  console.log(comment_insert_query)
  db.query(comment_insert_query, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
}


export const get_comments = (req , res) =>{
  const comment_query = `Select * from comments where post_id = ${req.params.id} order by created_time asc`
  // console.log("POST ID : ", req.params.id)
  db.query(comment_query, (err, data) => {
    if (err){console.log(err)}
    else {return res.status(200).json(data)};
  });
}
