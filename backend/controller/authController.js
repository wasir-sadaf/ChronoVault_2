const db = require("../config/db");

const signup = (req,res) =>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({ message: 'all fields are required' });
    }

    const sql = "insert into users (username, email, password) values (?,?,?)";
    db.query(sql, [username, email, password], (error, result)=>{
        if(error){
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'user registered successfully', userId: result.insertId });
    })
}

const login =(req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'all fields are required'});
    }

    const sql = "select * from users where email = ? and password = ?";
    db.query(sql, [email,password], (error,result)=>{
        if(error){
            return res.status(500).json({ message: error.message });
        }
        if(result.length == 0){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: result[0].id, username: result[0].username });
    })
}

module.exports = {signup, login};