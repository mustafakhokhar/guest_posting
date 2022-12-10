import mysql from "mysql"
import dbConfig from "./db_config.js";

// export const db = mysql.createConnection({
//   host:"us-cdbr-east-06.cleardb.net",
//   user:"b427d8cf20ccbb",
//   password: "7d30cb42",
//   database:"heroku_ecfadd55d5194b2",
// })

export var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});