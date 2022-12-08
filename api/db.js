import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "NewPassword",
  database:"Guest_hosting_site"
})