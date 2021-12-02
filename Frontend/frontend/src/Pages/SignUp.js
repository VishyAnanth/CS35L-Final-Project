import { useEffect, useRef } from "react";

import "./SignUp.css";

function SignUp() {

    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const username = useRef(null);
    const password = useRef(null);
    useEffect(() => {
        document.title = "InstaPowellCat | Sign Up";
    });

    function signUpClicked() {

        if(firstName.current.value === "" || 
        lastName.current.value === "" ||
        email.current.value === "" ||
        username.current.value === "" || 
        password.current.value === "") {
            alert("Invalid input");
        } else {
            const data = {
                "token":"",
                "user": {
                    "id":"",
                    "username":username.current.value,
                    "password":password.current.value,
                    "email":email.current.value,
                    "firstName":firstName.current.value,
                    "lastName":password.current.value,
                    "enabled":true,
                    "nonExpired":true,
                    "nonLocked":true,
                    "credentialsNonExpired":true,
                    "score":0
                }
            }
            fetch('/signUp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === "SUCCESS") {
                    localStorage.setItem('token', data.token); 
                    localStorage.setItem('currentUsername', data.user.username);
                    localStorage.setItem('signInUsername', data.user.username);
                    window.location.href = '/home';
                } else {
                    alert("Error");
                }
            }).catch((error) => {
                alert("Error: " + error);
            });
        }
    }
    
    return(
        <div>
            <div className="signUpContainer2">
                <div className="logoSignUp2">InstaPowellCat</div>
                <input ref={firstName} type="text" className="inputFields2" placeholder="First Name" />
                <input ref={lastName} type="text" className="inputFields2" placeholder="Last Name" />
                <input ref={email} type="text" className="inputFields2" placeholder="Email" />
                <input ref={username} type="text" className="inputFields2" placeholder="Username" />
                <input ref={password} type="password" className="inputFields2" placeholder="Password" />
                
                <div className="signUpButton2" onClick={() => signUpClicked()}>Sign Up</div>
                <div className="signUpButton2 loginButton2" onClick={() => {
                    window.location.href = "/";
                }}>Login</div>
            </div>
        </div>
    )
}

export default SignUp;