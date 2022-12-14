# Guest Posting Site: F-Society - ReactJs NodeJs SAAS MySql

###### Live Preview: https://fsociety.herokuapp.com

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

## To Run the Project on localhost:
- Make Sure .env has correct hostname, password and other credentials AND Database has relevant tables/data.
1) **Git clone repository**
2) **In Code Editor Terminal**
   - Open "API" folder
   - Run "npm i"
   - Run "node index.js"
This will Start Backend Server
3) **In another Code Editor Terminal**
   - Open "CLIENT" folder
   - Run "npm i"
   - Run "npm start"
This will launch the web application

The page will reload when you make changes.

## Deployment:
Used: Heroku with ClearDB addon.
* Web app works on local host, it will not work if directly deployed on heroku. Few chnages are needed for deployment.

### 1) **Changes in Client Side:**
- In client/package.json
  - Remove very last line ```"proxy": "http://localhost:8800/api/"```
- Create New file in client/src/config.js
```
import axios from "axios"
export const axiosInstance = axios.create({
    baseURL : "https://your-herukoapp-name.herokuapp.com/api/"
})
```
- Review everyfile in subfolders of client and replace axios with axiosInstnace imported from client/src/config.js

TADA Your Client Side is ready

- In Terminal, go to client folder ands run:
```
npm run build
```
This will create a "build" folder under client which has Build version of client side which will be deployed on Heroku.

- Copy all content of client/build folder and paste them into api/public, if api/public doesn't exist, create one
 

### 2) **Heroku Setup:**
- In Terminal go to api folder
- login to Heroku by entering Email and Password
```
heroku login -i
```
- Create Heroku app
```
heroku create your-herokuapp-name
git init
git add .
git commit -m "First-commit"
git push heroku master
```
** Congratulations Your App is now deployed (without a Database)

### 3) **Setup ClearDB (MySQL addon)**
```
heroku addons:create cleardb:ignite
```
- Configure Connection
```heroku
heroku config | grep CLEARDB_DATABASE_URL
```
Output : ```CLEARDB_DATABASE_URL: mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true```
- Copy the value of the CLEARDB_DATABASE_URL config variable and use it in the following command:
- URL contains:
  - b7e2437887xxxa: username
  - 0200xxx6: password
  - us-cdbr-iron-east-02.cleardb.net: host
  - heroku_7643ec736354xxx: database
```heroku
heroku config:set DATABASE_URL='mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true'
```
- Configure (expressjs) Node.js to connect ClearDB MySQL on Heroku
go to api.db.js and update
```
export const db = mysql.createPool('mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true')
```
DATABASE CONNECTED???!?

### 4) **Changes in api/index.js **
- "require" is not directly supported on latest expressJs. So to use "require" function, Add this code
 ```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname + "/public")));
const PORT = process.env.PORT || 8800;
```
- lastly update
```javascript
app.listen(PORT, () => {
  console.log("Connected!");
});
```

### 5) **ENJOY**
- commit all of these updates
```
git add .
git commit -m "last-commit"
git push heroku master
```

### 6) **Create MySQL table on ClearDB**
- Before testing our app on Heroku, we need to create MySQL table named customers on ClearDB.
```
mysql --host=us-cdbr-iron-east-02.cleardb.net --user=b7e2437887xxxa --password=0200xxx6 --reconnect heroku_7643ec736354xxx
```
This will open mysql terminal. Create the table with SQL script in the mysql terminal.


