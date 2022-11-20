// this file has no link with the user interface , only creates tables onces :

const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
// const { promisify } = require("util");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

/*
//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
*/ 
/*Add you connestion details to the env file*/
var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password
    }
);
function createTable(CreateQuerry)
{
    console.log(CreateQuerry)
    /*
    The function is responsible for creating tables in your database. Do not modify it.

    */
   return new Promise((resolve, reject)=>{
    connectionString.query(CreateQuerry,
        (err,result)=>
        {
            if(err)
            {
                console.log("Table creation failed");
                reject(err);
            }
            else
            {
                console.log("Table created");
                resolve()
                //console.log(result);
            }
        });

   });
}
    


// const createTablePromised = promisify(createTable)

/*
    Here you will be writing your create table queries and storing them in a const variable.
*/

// CREATE WEATHER QUERY :

create_user_details = "Create table user_info (username varchar(15) , full_name varchar(50),  password varchar(15) , security_1 varchar(50) , security_2 varchar(50) , security_3 varchar(50) , status varchar(8) , total_reports INT , is_account_ban varchar(20), primary key(username))"

connectionString.connect( (error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`, async (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {

                connectionString.query("USE Guest_hosting_site;",(err , result) =>{
                    console.log("error occured in using your databases!")
                })

                console.log("Database Created");
                try{
                    //call create table here using await like done below here.
                    
                    // await createTable(CreateQuerry)
                    
                    await createTable(create_user_details)
                    
                }
                catch(err)
                {
                    console.log(err)
                }
                
                connectionString.end();
            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});