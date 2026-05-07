import axios from "axios";
import isEmail from "validator/lib/isEmail";



function debounce(fnc, event_listner_target){

    let timeout;

    event_listner_target.addEventListener("input", ()=>{
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
               fnc();
              }, 2000)
});
}

const user_email_input = document.getElementById('email');
const user_phone_no_input = document.getElementById('phone-no');
const user_username_input = document.getElementById('username');
const user_pass_input = document.getElementById('user-pass');

const signup_btn = document.getElementById('signup-btn');
const login_btn = document.getElementById('login-btn');



let valid_user_email = "";
let valid_user_pass = "";


function validate_email(){
    let user_email = user_email_input.value;
    if (isEmail(user_email)) {
        document.getElementById('email_feedback').textContent = ""
        return valid_user_email = user_email;
    } else {
        document.getElementById('email_feedback').textContent = "Please provide a valid email"
    }
}

function validate_pass(){
    let user_pass = user_pass_input.value;
    let checkpass = user_pass.length >= 8 &&
                    /[A-Z]/.test(user_pass) &&
                    /[a-z]/.test(user_pass) &&
                    /[0-9]/.test(user_pass) &&
                    /[^A-Za-z0-9]/.test(user_pass);
    if(checkpass){
        document.getElementById('pass_feedback').textContent = "";
        return valid_user_pass = user_pass
    } else{
        document.getElementById('pass_feedback').textContent = "Please create a Strong password";
    }
}


async function sendcred() {
    try {
        const response = await
        axios.post('http://10.47.43.103:3000/api/userdata', {
            user_email: valid_user_email,
            user_phone_no: user_phone_no,
            user_username: user_username,
            user_pass: valid_user_pass
        })
    }
    catch(err){
        console.log(err);
    }
}

signup_btn.addEventListener("click", sendcred);

debounce(validate_email, user_email_input);
debounce(validate_pass, user_pass_input);