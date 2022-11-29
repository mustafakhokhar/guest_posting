import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      const q =
        "INSERT INTO guest_hosting_site.posts(`post_id`, `writer_id`, `post_content`, `admin_approval_status`, `tag1`,`tag2`,`tag3`,`totalLikes`,`totalDislikes`,`reportCount`,`totalComments`) VALUES (?)";
      console.log('query created')
  
      const values = [
        req.body.post_id,
        userInfo.id,
        req.body.post_content,
        req.body.admin_approval_status,
        req.body.tag1,
        req.body.tag2,
        req.body.tag3,
        req.body.totalLikes,
        req.body.totalDislikes,
        req.body.reportCount,
        req.body.totalComments,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });
  };
  