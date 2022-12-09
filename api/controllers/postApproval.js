import { db } from "../db.js";

export const getPostsApproval = (req, res) => {
  const q =  "Select * from posts where admin_approval_status = 0";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getPostApproval = (req, res) => {
  const q =  "SELECT * FROM POSTS WHERE post_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};


export const updateApprovalStatus = (req ,res) =>{
  // console.log("Update Approval Status Admin :",req.body)
  const post_details = req.body[0]
  const post_id = post_details.post_id
  const postNotApproved = post_details.admin_approval_status + 1
  const updatePostApprovalStatus = `Update posts set admin_approval_status = ${postNotApproved} where post_id = ${post_id}  `
  db.query(updatePostApprovalStatus, (err, data) => {
    if (err) {return res.status(500).json(err)}
    else {
      console.log("Post Approved successfully!")
    }
  })
};
