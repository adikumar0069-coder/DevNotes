const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const pool = require("./dbconfig");
const { availableMemory } = require("process");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const jwt = require("jsonwebtoken");


const app = express();


const create_token = (username)=>{
    const token = jwt.sign(
        {
            username: username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    return token;
}

app.use(express.static('Static'));
app.use(express.json());
app.use(cookieParser());


let phone_no_T_F = false;



app.get('/', (req, res)=>{
    let auth = false;
    if(auth){
        res.sendFile(path.join(__dirname, "./Public", "index.html"))
    }
    else{
        res.redirect("/signup")
    }
})
app.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname,'./Public', 'signup.html'))
})

app.post("/api/check_email", async (req, res)=>{
    let user_email = req.body.user_email;
    console.log("checking email in db")
    async function checkemail_indb() {
        try {
           const result = await pool.query("SELECT email FROM users WHERE email = $1 LIMIT 1",
            [user_email]
           )
           if (result.rows.length > 0) {
            res.json({
                exists: "exist"
            })
            console.log('exist')
           } else {
            res.json({
                exists: "available"
            })
            console.log(" email is available")
           }
        } catch (error) {
            console.log(error)
        }
    }
    checkemail_indb();
})



app.post("/api/userdata", async (req,res)=>{
      let user_email = req.body.user_email;
      let user_phone_no = req.body.user_phone_no;
      let user_username = req.body.user_username;
      let user_pass = req.body.user_pass;

      let hash_pass = await bcrypt.hash(user_pass, 10);
    

      if(phone_no_T_F){
        async function insertdb(){
        try {
            await pool.query("INSERT INTO users(email, username, phone_number, password_hash) VALUES($1,$2,$3,$4)",
            [user_email, user_username, user_phone_no, hash_pass]
            )
        phone_no_T_F = false;
         res.json({massage: "data resived"});
        } catch (error) {
            if (error.code === '23505') {
                console.log(error.constraint)      
            }
        }
      }

      insertdb();

      const token = create_token(user_username)

      res.cookie("token",token,{
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 604800000
      })

      }
})

app.post('/api/check_username', async (req, res)=>{
    let username = req.body.username
    try {
        const result = await pool.query("SELECT username FROM users WHERE username = $1 LIMIT 1",
            [username]
           )
           if (result.rows.length > 0) {
            res.json({
                exists: "exist"
            })
            console.log('exist')
           } else {
            res.json({
                exists: "available"
            })
            console.log("username is available");
           }
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/check_phone_no", async (req, res)=>{
    let phone_no = req.body.phone_no;
    console.log(`checking phonenumber in db ${phone_no}`)
    try {
        let result = await pool.query("SELECT COUNT(*) FROM users WHERE phone_number = $1",
            [phone_no]
        )
        count = Number(result.rows[0].count);
        if (count <= 3) {
            res.json({
                phone_no: "available"
            })
            phone_no_T_F = true;
        } else {
            res.json({
                phone_no: "not_available"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

app.listen('3000', "0.0.0.0", ()=>{
    console.log("server working on port 3000");
})
  
async function auth() {
    
}
