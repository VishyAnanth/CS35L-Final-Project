import { useEffect, useRef, useState } from "react";
import {AiOutlineSearch, AiFillCaretDown} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'

import "./Navbar.css";
import UserResult from "./UserResult";

function Navbar() {
    const [searchBarClasses, setSearchBarClasses] = useState("");
    const [profileClasses, setProfileClasses] = useState("");
    const [resultsClasses, setResultsClasses] = useState("");
    const searchBarRef = useRef(null);
    const [postsResultsArr, setPostsResultsArr] = useState([]);
    const [usersResultsArr, setUsersResultsArr] = useState([]);
    const [signOutButton, setSignOutButton] = useState("");

    useEffect(() => {   //Search bar should only be visible on home page
        if(window.location.href === "http://localhost:3000/home") {     
            setSearchBarClasses("");
        } else {
            if(window.location.href === "http://localhost:3000/") {
                setProfileClasses("displayNone");
            }
            setSearchBarClasses("displayNone");
        }
        
    }, []);

    function profileButtonClicked() {       //display profile page
        localStorage.setItem('currentUsername', localStorage.getItem('signInUsername'));
        window.location.href = '/profile';
    }

    function searchbarFocused() {       //toggle search bar
        setResultsClasses("displayResults");    
        callSearch(searchBarRef.current.value);     //get search function
    }

    function searchbarUnfocused() {     //allow user to unclick without screwing up the results bar
        setTimeout(() => {
            setResultsClasses("");
        }, 300);    //need timeout to make sure
    }

    function inputChange() {    //get search text
        const searchText = searchBarRef.current.value;
        callSearch(searchText);
    }    

    function callSearch(searchString) {     //send search data to backend database
        const arr2 = [];
        const searchData2 = {
            "token":"",
            "user": {
                "id":"",
                "username": searchString,
                "password":"",
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

        fetch('/searchUserByUsername', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(searchData2),
        })
        .then(response => response.json())
        .then(data => {
            for(const elem in data) {
                arr2.push(<UserResult username={data[elem].username} />);
            }
            setUsersResultsArr(arr2);
        }).catch((error) => {
            alert("Error: " + error);
        });
    }

    function signOut() {    //get signout page
        fetch('/signOut', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "SUCCESS") {
                localStorage.removeItem('token');
                localStorage.removeItem('currentUsername');
                localStorage.removeItem('signInUsername');
                window.location.href = '/';
            } else {
                alert("There was an error");
            }
        }).catch((error) => {
            alert("Error: " + error);
        });
    }

    function displaySignOut() {
        if(signOutButton === "") {
            setSignOutButton("displayResults");
        } else {
            setSignOutButton("");
        }
    }

    return (
        <div className="navbar">
            <div className="logo" onClick={() => {
                window.location.href = "/home";
            }}>InstaPowellCat</div>
            <input ref={searchBarRef} onChange={() => inputChange()} onBlur={() => searchbarUnfocused()} onFocus={() => searchbarFocused()} type="text" className={"searchBar " + searchBarClasses} />
            <AiOutlineSearch className={"searchBarIcon " + searchBarClasses} />
            <div className={"profileImageContainer " + profileClasses}>
                <CgProfile size={30} onClick={() => profileButtonClicked()} className="profileButton" />
                <AiFillCaretDown onClick={() => displaySignOut()} className="downCaret" />
            </div>
            <div className={"resultsContainer " + resultsClasses}>
                <div className="resultsLabel">Users</div>
                {usersResultsArr}
            </div>
            <div onClick={() => signOut()} className={"signOutContainer " + signOutButton}>Sign Out</div>
        </div>
    );
}

export default Navbar;