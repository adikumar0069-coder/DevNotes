const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const pool = require("./dbconfig");
const { availableMemory, nextTick } = require("process");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const jwt = require("jsonwebtoken");


const app = express();

// creating token for auth

const create_token = (username) => {
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

// creating middleware for protecting routes

const protect_route = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {

            return res.json({
                massage: "token not found"
            })

        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next()
    }
    catch (err) {
        console.log(err)
    }
}

app.use(express.json());
app.use(cookieParser());

async function check_username(username) {

    try {
        const result = await pool.query("SELECT username FROM users WHERE username = $1 LIMIT 1",
            [username]
        )
        if (result.rows.length > 0) {

            console.log('exist')

            return false;

        } else {

            console.log("username is available");

            return true;
        }
    } catch (error) {
        console.log(error)
    }

}

async function check_email_availability(email) {

    try {
        const result = await pool.query("SELECT username FROM users WHERE username = $1 LIMIT 1",
            [email]
        )
        if (result.rows.length > 0) {

            console.log('exist')

            return false;

        } else {

            console.log("email is available");

            return {
                email_availability: true
            }
        }
    } catch (error) {
        console.log(error)
    }

}

async function check_phone_no_availability(phone_no) {

    try {

        let result = await pool.query("SELECT COUNT(*) FROM users WHERE phone_number = $1",
            [phone_no]
        )

        let count = Number(result.rows[0].count);
        if (count < 3) {

            return true;

        } else {

            return false;

        }

    } catch (error) {
        console.log(error)
    }

}

app.post('/api/check_username', async (req, res) => {

    const username = req.body.user_name;

    const availability = check_username(username)

    if (availability) {
        res.json({
            exists: true
        })
    } else {
        res.json({
            exists: false
        })
    }

})

app.post('auth/api/signup', async (req, res) => {

    let username = req.body.user_name;
    let email = req.body.user_email;
    let phone_number = req.body.phone_no;
    let password = req.body.user_password;

    let email_availability = check_email_availability(email);
    let username_availability = check_username(username);
    let phone_no_availability = check_phone_no_availability(phone_number);

    let password_hash = await bcrypt.hash(password, 10);

    if (email_availability && username_availability && phone_no_availability) {

        try {

            await pool.query("INSERT INTO users(email, username, phone_number, password_hash) VALUES($1,$2,$3,$4)",
                [email, username, phone_number, password_hash]
            )

            const token = create_token(username);

            console.log('token create');

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 604800000
            })

            res.json({
                message: "done",
                new_location: "/",
            })

        } catch (error) {
            console.log('error')
        }

    }
    else {
        res.json({
            email_availability: email_availability,
            phone_no_availability: phone_no_availability
        })
    }

})

// need to fix this globle veriable

//let phone_no_T_F = false;

// home route

/* app.get('/', protect_route, (req, res) => {

    if (req.user !== null) {
        res.sendFile(path.join(__dirname, "Static", "index.html"))
    }
})

// signup route

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Static', 'signup.html'));
})

// login route

app.get('/login', (req, res) => {
    console.log("sending file to front end for login page")
    res.sendFile(path.join(__dirname, "Static", "login.html"))
})

// login the user by checking db

app.post("/api/login", async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    try {
        if (email !== null) {
            console.log("runing query")
            let result = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1",
                [email])

            let password_hash = result.rows[0].password_hash;

            let match = await bcrypt.compare(password, password_hash);

            if (match) {
                const token = create_token(result.rows[0].username)

                res.cookie("token", token, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "strict",
                    maxAge: 604800000
                })

                res.json({
                    auth: "correct_pass"
                })

            }

            else {
                res.json({
                    auth: "wrong_pass"
                })
            }
        }
    } catch (error) {

    }
})

// checking email id exists or not in db

app.post("/api/check_email", async (req, res) => {
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

// inserting the user data in backend after user sign up

app.post("/api/userdata", async (req, res) => {
    let user_email = req.body.user_email;
    let user_phone_no = req.body.user_phone_no;
    let user_username = req.body.user_username;
    let user_pass = req.body.user_pass;

    let hash_pass = await bcrypt.hash(user_pass, 10);

    let phone_no_T_F = false;

    console.log(`checking phonenumber in db ${user_phone_no}`)

    let result = await pool.query("SELECT COUNT(*) FROM users WHERE phone_number = $1",
        [user_phone_no]
    )

    let count = Number(result.rows[0].count);
    if (count < 3) {
        phone_no_T_F = true;
    } else {
        res.json({
            phone_no: "not_available"
        })
    }

    if (phone_no_T_F) {
        async function insertdb() {
            try {
                await pool.query("INSERT INTO users(email, username, phone_number, password_hash) VALUES($1,$2,$3,$4)",
                    [user_email, user_username, user_phone_no, hash_pass]
                )
                phone_no_T_F = false;

                const token = create_token(user_username)

                console.log(token);

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    maxAge: 604800000
                })

                res.json({
                    message: "done",
                    new_location: "/",
                })

            } catch (error) {
                if (error.code === '23505') {
                    console.log(error.constraint)
                }
            }
        }

        insertdb();

    }
})

// checking username is available or not 

app.post('/api/check_username', async (req, res) => {
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

/* app.post("/api/check_phone_no", async (req, res)=>{
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
 */
app.use(express.static("Static"))

app.listen('3000', "0.0.0.0", () => {
    console.log("server working on port 3000");
})


