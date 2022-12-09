Guest Posting Site - Reactjs Expressjz SAAS MySql

Live Preview: 

Technologies used:
- Reactjs
- Expressjs
- MySQL

Features:
Actors: Reader(R), Writer(W), Admin(A)
- Sign up      (R,W)
- Sign In      (R,W)
- Search       (R,W)
- Like/Dislike (R,W)
- Comment      (R,W)
- Create Poll    (W)
- Write Post     (W)
- Delete Post    (W)
- ViewMyPost     (W)
- ReportPost     (R)
- PostApproval   (A)
- BanUser        (A)

MySQL Database:
- Tables:
  - userInfo (username, fullname, password, securityQuestion1, securityQuestion2, securityQuestion3, status, totalReports, isAccountBan)
  - comments (commendID, postID, content, username, time)
  - posts    (postID, writerID, postContent, approvalStatus, tag1, tag2, tag3, totalLikes, totalDislikes, reportCount, totalCOmments)
  - polls    (pollID, WriterID, title, option1, option2, option3, vote1, vote2, vote3)
  - userHasLiked (username, isLiked, postID)
  - userHasReported (username, postID)

To Run the Project:
- Make Sure .env has correct hostname, password and other credentials AND Database has relevant tables/data.
1) Git clone repository
2) In Code Editor Terminal
   - Open "API" folder
   - Run "npm i"
   - Run "node index.js"
This will Start Backend Server
3) In another Code Editor Terminal
   - Open "CLIENT" folder
   - Run "npm i"
   - Run "npm start"
This will launch the web application

The page will reload when you make changes.
