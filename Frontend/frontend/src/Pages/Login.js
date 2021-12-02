import { useEffect, useRef } from "react";

import "./Login.css";

function Login() {
    const username = useRef(null);
    const password = useRef(null);
    
    useEffect(() => {
        document.title = "InstaPowellCat | Login";
    });

    function loginClicked() {
        if(username.current.value === "") {
            alert("Invalid username");
        } else if(password.current.value === "") {
            alert("Invalid password");
        } else {
            const data = {
                "token":"",
                "user": {
                    "id":"",
                    "username":username.current.value,
                    "password":password.current.value,
                    "email":"",
                    "firstName":"",
                    "lastName":"",
                    "enabled":true,
                    "nonExpired":true,
                    "nonLocked":true,
                    "credentialsNonExpired":true,
                    "score":0
                }
            }
            fetch('/signIn', {
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
                    console.log()
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('currentUsername', data.user.username);
                    localStorage.setItem('signInUsername', data.user.username);
                    window.location.href = '/home';
                } else {
                    alert("Invalid username password combination");
                }
            }).catch((error) => {
                alert("Error: " + error);
            });
        }
    }

    return(
        <div>
            <div className="loginContainer">
                <div className="logoLogin">InstaPowellCat</div>
                <input ref={username} type="text" className="inputFields" placeholder="Username" />
                <input ref={password} type="password" className="inputFields" placeholder="Password" />
                <div className="loginButton" onClick={() => loginClicked()}>Login</div>
                <div className="loginButton signUpButton" onClick={() => {
                    window.location.href = "/signup";
                }}>Sign Up</div>
            </div>
        </div>
    )
}

export default Login;