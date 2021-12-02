import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Navbar from "../CommonComponents/Navbar";
import Post from "../CommonComponents/Post";

import "./Profile.css";

function Profile() {
    const [postArray, setPostsArray] = useState([]);
    const [moodArr, setMoodArr] = useState(["😡","😔","😐","😃","😎"]);
    const [scoreVal, setScoreVal] = useState(0);

    useEffect(() => {
        if(window.localStorage.getItem('token') === null) {
            window.location.href = "/";
        }
        document.title = "InstaPowellCat | Profile";
        getUser();
        getPostsOfUser();
    }, []);

    function getUser() {
        const data = {
            "token":"",
            "user": {
                "id":"",
                "username": localStorage.getItem("currentUsername"),
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
        fetch('/getUser', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "SUCCESS") {
                setScoreVal(data.user.score);
            }
        }).catch((error) => {
            alert("Error: " + error);
        });
    }

    async function getPostsOfUser() {
        const data = {
            "token":"",
            "user": {
                "id":"",
                "username": localStorage.getItem("currentUsername"),
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
        const res = await fetch('/getPostsOfUser', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            data = data.reverse();
            return Promise.all(
                data.map(
                    item => fetch('/checkVoted', {
                        method: 'POST',
                        headers: { 
                            Accept: 'application/json',
                            'Authorization':'Bearer ' + localStorage.getItem('token'),
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({
                            "id":"",
                            "userId":"",
                            "postId":item.id,
                            "vote":0
                        }),
                    }).then(response2 => (
                        {
                            elem1:item, 
                            elem2:response2.json()
                        }
                    ))
                )
            );
        }).then((data) => {
            data.map(item => {
                item.elem2.then((x) => {
                    setPostsArray(postArray => [...postArray, <Post 
                        refresh={getUser}
                        postId={item.elem1.id}
                        username={item.elem1.posterUsername}  
                        date={item.elem1.date}
                        downvotes={item.elem1.downvotes}
                        upvotes={item.elem1.upvotes}
                        title={item.elem1.title}
                        base64={item.elem1.base64}
                        caption={item.elem1.caption}
                        mood={moodArr[item.elem1.mood - 1]}
                        voted={x.id === "SUCCESS"}
                    />]);
                })
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <CgProfile className="profileImageProfilePage" size={90} />
                <div className="username">{localStorage.getItem('currentUsername')}</div>
                <div className="profileScore">{scoreVal}</div>
                <div className="feed2">
                    {postArray}
                </div>
            </div>
        </div>
    );
}

export default Profile;