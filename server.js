const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const pool = require("./dbconfig");
const app = express();


app.use(express.static('Static'));
app.use(express.json());


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
    res.sendFile(path.join(__dirname,'./Public', 'signup.html'));
})

app.post("/api/userdata", async (req,res)=>{
      let user_email = req.body.user_email;
      let user_phone_no = req.body.user_phone_no;
      let user_username = req.body.user_username;
      let user_pass = req.body.user_pass;

      let hash_pass = await bcrypt.hash(user_pass, 10);

      insertdb();
       
      async function insertdb(){
        try {
            await pool.query("INSERT INTO user_info(email, phono_no, username, hash_pass) VALUES($1,$2,$3,$4)",
            [user_email, user_phone_no, user_username, hash_pass]
        )
         res.json({massage: "data resived"});
        } catch (error) {
            if (error.code === '23505') {
                console.log(error.constraint)      
            }
        }
      }
})

app.listen('3000', "0.0.0.0", ()=>{
    console.log("server working on port 3000");
})
  
async function auth() {
    
}

