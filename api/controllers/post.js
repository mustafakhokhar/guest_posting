import { db } from "../db.js";
import jwt from "jsonwebtoken";



function unixTimestamp (date = Date.now()) {  
  return Math.floor(date / 1000)
}

var i= 0


export const getPosts = (req, res) => {
  // const q = req.query.cat
    // ? "SELECT * FROM posts WHERE cat=?"
    // : "SELECT * FROM posts";
  const q =  "Select * from posts";
    // console.log("yesssssdsdsds\n")
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    // console.log(data)
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  // console.log("I AM CALLLLLEDDDDDDDD")
  // console.log(req.params.id)
  // console.log("yesss")
  const q =  "SELECT * FROM POSTS WHERE post_id = ? ";

   
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    // console.log("yess111111")
    // console.log(data[0])
    return res.status(200).json(data[0]);
  });
};








export const addPost = (req, res) => {
  console.log("Inside addPost")
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO guest_hosting_site_new.posts(`post_id`,`writer_id`,`post_content`,`admin_approval_status`,`tag1`,`tag2`,`tag3`,`totalLikes`,`totalDislikes`,`reportCount`,`totalComments`) VALUES (?)";


    const values = [
      i++,
      req.body.usersname,
      req.body.desc,
      0,
      req.body.tag1,
      req.body.tag2,
      req.body.tag3,
      0,
      0,
      0,
      0
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(550).json(err);
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

  // console.log("here")

  // // console.log("yeee")
  // // console.log(req.body)
  const post_details = req.body[0]
  const user_details = req.body[1]

  var new_likes = post_details.totalLikes 
  var new_dislikes = post_details.totalDislikes
  const post_id = post_details.post_id
  const user_name = user_details.username

  const has_table_query = `Select * from user_has_liked where username = "${user_name}" and post_id = ${post_id}`
  
  // // console.log(`new likes : ${new_likes} , post id : ${post_id} , user_name : ${user_name} , totalDislikes = ${new_dislikes} `)
  const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
  
  
  



  // 1 : checking if the user has liked or liking for the first time : 

  db.query(has_table_query, (err, data) => {
    
    if (err) {

      // return res.status(500).json(err)
      // console.log("error here")
      // console.log(err)

    }

    else {

      if(data.length >0)
      {

        // console.log("yes there is data ! ")
        // console.log(`Data is : ${data} , length is : ${data.length}`)
        
        // 2 : checking if the person has liked or disliked the post before : 
        
        if (data[0].isLiekd == 0){ // means that person first disliked it first but now wanna like it :

          new_likes = new_likes + 1
          new_dislikes = new_dislikes - 1

          // we will first update the entry in has table :

          const update_has_table = `Update user_has_liked set isLiekd = ${1} where post_id = ${post_id} and username = "${user_name}"`
          db.query( update_has_table , (err , data)=>{
            
            if (err) return res.status(500).json(err);
            else{

              const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
              db.query(sample_query, (err, data) => {

              if (err) return res.status(500).json(err);
              // else // console.log("inserted suscesufully for the first time ")
              // return res.json("Post has been updated.");

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
            
            // incrementing the likes :
            new_likes = new_likes + 1
            const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
            db.query(sample_query, (err, data) => {

              if (err) return res.status(500).json(err);
              // else // console.log("inserted suscesufully for the first time ")
              // return res.json("Post has been updated.");

            });
          } 
          
          // console.log("donee!")
          // return res.json("Post has been updated.");
        });
        
      
      }

    }
    return res.json("Post has been updated.");
  });

};

export const update_dislike = (req, res) => {
  // console.log("here")

  // // console.log("yeee")
  // // console.log(req.body)
  const post_details = req.body[0]
  const user_details = req.body[1]

  var new_likes = post_details.totalLikes 
  var new_dislikes = post_details.totalDislikes
  const post_id = post_details.post_id
  const user_name = user_details.username

  const has_table_query = `Select * from user_has_liked where username = "${user_name}" and post_id = ${post_id}`
  
  // // console.log(`new likes : ${new_likes} , post id : ${post_id} , user_name : ${user_name} , totalDislikes = ${new_dislikes} `)
  const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
  
  
  



  // 1 : checking if the user has liked or liking for the first time : 

  db.query(has_table_query, (err, data) => {
    
    if (err) {

      // return res.status(500).json(err)
      // console.log("error here")
      // console.log(err)

    }

    else {

      if(data.length >0)
      {

        // console.log("yes there is data ! ")
        // console.log(`Data is : ${data} , length is : ${data.length}`)
        
        // 2 : checking if the person has liked or disliked the post before : 
        // console.log(data[0].isLiekd)
        if (data[0].isLiekd == 1){ // means that person first disliked it first but now wanna like it :

          new_likes = new_likes - 1
          new_dislikes = new_dislikes + 1
          // console.log("yepp")

          // we will first update the entry in has table :

          const update_has_table = `Update user_has_liked set isLiekd = ${0} where post_id = ${post_id} and username = "${user_name}"`
          db.query( update_has_table , (err , data)=>{
            
            if (err) return res.status(500).json(err);
            else{

              const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
              db.query(sample_query, (err, data) => {

              if (err) return res.status(500).json(err);
              // else // console.log("inserted suscesufully for the first time ")
              // return res.json("Post has been updated.");

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
            
            // incrementing the likes :
            new_dislikes = new_dislikes + 1
            const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
            db.query(sample_query, (err, data) => {

              if (err) return res.status(500).json(err);
              // else // console.log("inserted suscesufully for the first time ")
              // return res.json("Post has been updated.");

            });


          } 
          
          // console.log("donee!")
          // return res.json("Post has been updated.");
        });
        
      
      }

    }
    return res.json("Post has been updated.");
  });

};

export const update_report_status = (req ,res) =>{
 
  // // console.log("here")

  // // console.log("yeee")
  // // console.log(req.body)

  console.log("THIS IS YOUR DATA :",req.body)

  const post_details = req.body[0]
  const user_details = req.body[1]

  var total_reports = post_details.reportCount
  const post_id = post_details.post_id
  const user_name = user_details.username
  const new_report_count = post_details.reportCount + 1

  const has_table_query = `Select * from user_has_reported where username = "${user_name}" and post_id = ${post_id}`
  

  const error_msg = " You have already reported this post !" ; const error_msg_2 = "Post does not exist for which you are reporting !"
  
  // 1 : checking if the user has liked or liking for the first time : 

  db.query(has_table_query, (err, data) => {
    
    if (err) {

      console.log("no such post for report !")

    }

    else {

      // sending report error msg ! 
      if(data.length >0)
      {
        res.json({message : error_msg}) 
      }
      else // if the user is reporting for the first time !
      {

        const insert_has_query = `insert into user_has_reported values ("${user_name}" , "${post_id}")`
        const insert_report_query = `Update posts set reportCount = ${new_report_count} where post_id = ${post_id}  `
        // console.log("successfully done")
        db.query(insert_has_query, (err, data) => {

          // console.log("yep")
          if (err) {return res.status(500).json(err)}
          else {

            // adding report count in the post :
            
            db.query(insert_report_query, (err, data) => {

              // console.log("yep")
              if (err) {return res.status(500).json(err)}
              else {
    
                // sucess:

                console.log("done successfully!")
                
    
              }

            })

          }



        })
         
        //   else
        //   {
            
        //     // incrementing the likes :
        //     new_likes = new_likes + 1
        //     const sample_query = `Update posts set totalLikes = ${new_likes} , totalDislikes = ${new_dislikes} where post_id = ${post_id}`
        //     db.query(sample_query, (err, data) => {

        //       if (err) return res.status(500).json(err);
        //       else // console.log("inserted suscesufully for the first time ")
        //       // return res.json("Post has been updated.");

        //     });
        //   } 
          
        //   // console.log("donee!")
        //   // return res.json("Post has been updated.");
        // });
        
      
      }

    }
    // return res.json("Post has been updated.");
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
    // console.log(data)
    return res.status(200).json(data);
  });

}


export const get_comments = (req , res) =>{

  // const q =  "Select * from posts";
  // console.log("yesss!!!!sss", req.params.id)

  const comment_query = `Select * from comments where post_id = ${req.params.id}`
  // console.log("POST ID : ", req.params.id)
  db.query(comment_query, (err, data) => {
    if (err){console.log(err)}
    // console.log(data)
    else {return res.status(200).json(data)};
  });



//   db.query(q, (err, data) => {
//   if (err) return res.status(500).send(err);
//   return res.status(200).json(data);

// })} 
}
