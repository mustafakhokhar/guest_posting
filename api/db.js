import mysql from "mysql"

// export const db = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password: "root",
//   database:"Guest_hosting_site"
// })

export const db = mysql.createPool('mysql://b427d8cf20ccbb:7d30cb42@us-cdbr-east-06.cleardb.net/heroku_ecfadd55d5194b2?reconnect=true')