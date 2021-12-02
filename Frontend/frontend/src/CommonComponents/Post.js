import "./Post.css";

import {CgProfile} from 'react-icons/cg'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import { useEffect, useRef, useState } from "react";


function Post(props) {
    const [additionalClasses, setAdditionalClasses] = useState("");
    const usernameRef = useRef(null);
    const [voted, setVoted] = useState(false);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);

    useEffect(() => {
        if(props.voted === true) {
            setVoted(true);
            setAdditionalClasses("voted");
        } else {
            setVoted(false);
            setAdditionalClasses("");
        }
    }, []);

    function vote(elem) {
        if(!voted) {
            setAdditionalClasses("voted");
            setVoted(!voted);
            const data = {
                "id":"",
                "userId":"",
                "postId":props.postId,
                "vote":elem
            }
            fetch('/vote', {
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
                if(elem === 1) {
                    setUpvotes(upvotes + 1);
                } else if(elem === -1) {
                    setDownvotes(downvotes + 1);
                }
                props.refresh();
            }).catch((error) => {
                alert("Error: " + error);
            });
        }
    }

    function navigateToProfilePage() {
        localStorage.setItem('currentUsername', usernameRef.current.innerHTML);
        window.location.href = '/profile';
    }

    return (
        <div className="post">
            <div className="posterContainer">
                <CgProfile size={30} />
                <div ref={usernameRef} onClick={() => navigateToProfilePage()} className="usernameReg">{props.username}</div>
                <div className="date">{props.date}</div>
                <div className="upvotesLabel">{downvotes}</div>
                <AiFillCaretDown onClick={() => vote(-1)} size={30} className={"carets " + additionalClasses} />
                <AiFillCaretUp onClick={() => vote(1)} size={30} className={"carets " + additionalClasses} />
                <div>{upvotes}</div>
            </div>
            <div className="title">{props.title}</div>
            <img className="postImage" src={props.base64} />
            <div className="caption">{props.caption}</div>
            <div className="mood">{"Mood: " + props.mood}</div>
        </div>
    )
}

export default Post;