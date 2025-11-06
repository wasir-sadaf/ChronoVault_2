const mysql = require("mysql2");

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'chronodb',
    password : 'hereisdatabase'
})

db.connect((err)=>{
    if(err) {
        console.log("database connection failed", err.message);
        return;
    }
    console.log("database is connected");
})

module.exports = db;