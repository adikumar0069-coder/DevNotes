import axios from "axios";
import isEmail from "validator/lib/isEmail";

// debounce fnc for showing feedback for email and pass

function debounce(fnc, event_listner_target, frequncy) {

    let timeout;

    event_listner_target.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, frequncy)
    });
}

// getting all the veriables from fronend

const user_email_input = document.getElementById('email');
const user_phone_no_input = document.getElementById('phone-no');
const user_username_input = document.getElementById('username');
const user_pass_input = document.getElementById('user-pass');

const email_feedback = document.getElementById("email_feedback");
const phone_feedback = document.getElementById("phone_feedback");
const username_feedback = document.getElementById("username_feedback");
const pass_feedback = document.getElementById("pass_feedback");

const signup_btn = document.getElementById('signup-btn-(sign)');
const login_btn = document.getElementById('login-btn-(sign)');



/* let valid_user_email = "";
let valid_user_pass = ""; */

//validating email

function validate_user_email() {

    let user_email = user_email_input.value;

    if (isEmail(user_email)) {

        return {
            user_email: user_email,
            validetion: true
        };
    }

    else {

        return false;

    }

}

// sending email to backend for check , its already teken or not

/* async function send_email_for_duplicates() {

    try {

        const validetion = validate_user_email();

        if (validetion.validetion) {

            const response = await axios.post('http://localhost:3000/api/check_email', {
                user_email: validetion.user_email
            })

            if (response.data.exists === 'exist') {
                return true;
            } else {
                return false;
            }
        }

    }

    catch (err) {
        console.log(err);
    }

} */

// checking pass strength

function check_pass_strength() {
    let user_pass = user_pass_input.value;
    let pass_strength = user_pass.length >= 8 &&
        /[A-Z]/.test(user_pass) &&
        /[a-z]/.test(user_pass) &&
        /[0-9]/.test(user_pass) &&
        /[^A-Za-z0-9]/.test(user_pass);

    if (pass_strength) {
        return {
            strength: true,
            user_pass: user_pass
        };
    } else {
        return false;
    }
}

// sending username to backend for check , its already teken or not

async function check_username_existing() {

    const user_name = user_username_input.value;

    try {

        const response = await axios.post('http://localhost:3000/api/check_username', {
            user_name: user_name
        })

        if (response.data.exists === "exist") {
            return {
                user_name: user_name,
                valid: true
            };
        }
        else {
           return false;
        }
    } 
    
    catch (error) {
        console.log(error);
    }
}

// sending credentials to backend for storing

async function send_cred() {
    
    const user_email = validate_user_email().user_email;
    const user_password = check_pass_strength().user_pass;
    const user_name = check_username_existing().user_name;
    const phone_no = user_phone_no_input.value;

    try {
        
        const response = axios.post('http://localhost:3000/auth/api/signup', {
            user_email: user_email,
            user_password: user_password,
            user_name: user_name,
            phone_no: phone_no
        })

        return response;

    } catch (error) {
        console.log(error);
    }
}


function Manage_cred_feedback (username, email, phone_no) {
    
}


/* function validate_email() {
    let user_email = user_email_input.value;
    if (isEmail(user_email)) {
        document.getElementById('email_feedback').textContent = ""

        send_email()

        async function send_email() {
            console.log('sendemail working')

            try {
                const response = await axios.post('http://localhost:3000/api/check_email', {
                    user_email: valid_user_email
                });
                if (response.data.exists === "exist") {
                    document.getElementById('email_feedback').textContent = "email is already is being used"
                } else {
                    document.getElementById('email_feedback').textContent = ""
                }
            } catch (error) {
                console.log(error)
            }
        }
        return valid_user_email = user_email;
    } else {
        document.getElementById('email_feedback').textContent = "Please provide a valid email"
    }
} */

//validating pass

/* function validate_pass() {
    let user_pass = user_pass_input.value;
    let checkpass = user_pass.length >= 8 &&
        /[A-Z]/.test(user_pass) &&
        /[a-z]/.test(user_pass) &&
        /[0-9]/.test(user_pass) &&
        /[^A-Za-z0-9]/.test(user_pass);
    if (checkpass) {
        document.getElementById('pass_feedback').textContent = "";
        return valid_user_pass = user_pass
    } else {
        document.getElementById('pass_feedback').textContent = "Please create a Strong password";
    }
} */

// sending email to backend for checking the email already exist or not

/* async function send_email() {
    console.log('sendemail working')
    validate_email();
    try {
        const response = await axios.post('http://localhost:3000/api/check_email', {
            user_email: valid_user_email
        });
        if (response.data.exists === "exist") {
            document.getElementById('email_feedback').textContent = "email is already is being used"
        } else {
            document.getElementById('email_feedback').textContent = ""
        }
    } catch (error) {
        console.log(error)
    }
} */

/* async function send_phone_no(){
    console.log('sending phone no to backend for check')
    try {
        let response = await axios.post("http://localhost:3000/api/check_phone_no", {
            phone_no: user_phone_no_input.value
        })
        if (response.data.phone_no === "not_available") {
            document.getElementById('phone_feedback').textContent = "Phone number. is used many times, use diffrent phone number"
        } else {
            document.getElementById('phone_feedback').textContent = ""
        }
    } catch (error) {
        console.log(error)
    }
} */

// send username to backend for checking
/* async function send_username() {
    console.log('sending username to backend for check')
    try {
        let response = await axios.post('http://localhost:3000/api/check_username', {
            username: user_username_input.value
        })
        if (response.data.exists === "exist") {
            document.getElementById('username_feedback').textContent = "username is already is being used, try a diffrent one"
        } else {
            document.getElementById('username_feedback').textContent = ""
        }
    } catch (error) {
        console.log(error)
    }
} */

// sending cred to backend

async function sendcred() {

    validate_email();
    validate_pass();

    try {
        const response = await axios.post('http://localhost:3000/api/userdata', {
            user_email: valid_user_email,
            user_phone_no: user_phone_no_input.value,
            user_username: user_username_input.value,
            user_pass: valid_user_pass
        })

        if (response.data.message === "done") {
            window.location.href = "/";
        }
    }
    catch (err) {
        console.log(err);
    }
}

function check_user_fillup_or_not() {
    let sendcred_bulean = true;
    if (user_email_input.value === "") {
        document.getElementById('email_feedback').textContent = "Email cannot be empty"
        sendcred_bulean = false;
    }
    if (user_phone_no_input.value === "") {
        document.getElementById('phone_feedback').textContent = "Phone No. cannot be empty"
        sendcred_bulean = false;
    }
    if (user_username_input.value === "") {
        document.getElementById('username_feedback').textContent = "Username cannot be empty"
        sendcred_bulean = false;
    }
    if (user_pass_input.value === "") {
        document.getElementById('pass_feedback').textContent = "Password cannot be empty"
        sendcred_bulean = false;
    }
    if (sendcred_bulean) {
        sendcred();
    }
}

async function login_page() {
    try {
        window.location.href = "/login"
        console.log("sending req to get login page")
    } catch (err) {
        console.log(err)
    }
}

signup_btn.addEventListener("click", check_user_fillup_or_not);
login_btn.addEventListener("click", login_page);

debounce(validate_email, user_email_input, 2000);
debounce(validate_pass, user_pass_input, 2000);
//debounce(send_email, user_email_input, 3000)
debounce(send_username, user_username_input, 500);

//user_username_input.addEventListener("click", send_phone_no);

