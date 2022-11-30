import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



//following code is to register a user to database :

export const register = (req, res) => {
  //CHECK EXISTING USER


  // const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  const q = "SELECT * FROM user_info where username = ?"

  console.log(req.body)

  db.query(q, req.body.username, (err, data) => {
    console.log(err)
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User exists in our system!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var status ;

    if (req.body.reader_type){
      status = "reader"
    }else if (req.body.reader_type) {
      status = "writer"
    }
    const q = "INSERT INTO guest_hosting_site.user_info(`username`,`full_name`, `password`,`security_1`, `security_2`, `security_3`,`status` , `total_reports` ,`is_account_ban`) VALUES (?)";
    const values = [req.body.username, req.body.name, req.body.password , req.body.question_1 , req.body.question_2 , req.body.question_3 ,status, 0 , false ];

    db.query(q, [values], (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM user_info WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    var isPasswordCorrect = false
    console.log(req.body.password)
    console.log(data[0].password)
    if (req.body.password == data[0].password){
      isPasswordCorrect = true
    }

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ username: data[0].username}, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};

export const ForgotPassword = (req, res) => {
  //CHECK USER
  console.log("here")
  const q = "SELECT * FROM user_info WHERE username = ?";
  console.log(req.body)
  
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    var isq1Correct = false
    console.log(req.body.question_1)
    console.log("yo")
    console.log(data[0].question_1)
    if (req.body.question_1 == data[0].security_1){
      isq1Correct = true
    }
    var isq2Correct = false
    console.log(req.body.question_2)
    console.log("yo")
    console.log(data[0].question_2)
    if (req.body.question_2 == data[0].security_2){
      isq2Correct = true
    }
    var isq3Correct = false
    console.log(req.body.question_3)
    console.log("yo")
    console.log(data[0].question_3)
    if (req.body.question_3 == data[0].security_3){
      isq3Correct = true
    }


    if (!isq1Correct && !isq2Correct && !isq3Correct)
      return res.status(400).json("Wrong answer!");
    else{
      res.status(400).json(`Your password is: ${data[0].password}`)
      return
    }

  });
};