import { createRef, useEffect, useRef, useState } from "react";
import Navbar from "../CommonComponents/Navbar";
import Post from "../CommonComponents/Post";
import NewPost from "../CommonComponents/NewPost";
import GoogleMapReact from "google-map-react";
import "./Home.css";

import {FaMapMarkerAlt} from 'react-icons/fa'
import {AiFillPlusCircle} from 'react-icons/ai'
import ScoreboardRow from "../CommonComponents/ScoreboardRow";

function Home() {

    const [isOpen, setIsOpen] = useState(false);
    const newPost = createRef(null);
    const [titleVal, settitleVal] = useState("");
    const [moodArr, setMoodArr] = useState(["😡","😔","😐","😃","😎"]);     //lol this was the easiest way for me
    const [postsArr, setPostsArr] = useState([]);
    const [scoresArr, setScoresArr] = useState([]);
    const [latArr, setLatArr] = useState([]);
    const [lngArr, setLngArr] = useState([]);
    const feedRef = useRef(null);
    const [prevScroll, setPrevScroll] = useState(0);
    const [currentBuffer, setCurrentBuffer] = useState(470);
    const [counter, setCounter] = useState(0);
    const [markerElem, setMarkerElement] = useState(null);

    const defaultProps = {
        center: {
          lat: 34.072222,
          lng: -118.444167
        },
        zoom: 16
    };
    

    function togglePopup() {    //self explanatory
        setIsOpen(!isOpen);
    }

    useEffect(() => {   //render scoreboard and posts.  Google-maps is rendered by library
        if(window.localStorage.getItem('token') === null) {
            window.location.href = "/";
        }
        document.title = "InstaPowellCat | Home";
        getPosts();
        scoreboard();
    }, []);

    function refreshPosts() {
        scoreboard();
        getPosts();
    }

    async function getPosts() {
        const data = {
            "id":"",
            "base64": "",
            "title": "",
            "caption": "",
            "posterId":"",
            "posterUsername":"",
            "latitude":0.0,
            "longitude":0.0,
            "date":"",
            "mood":"",
            "upvotes":0,
            "downvotes":0
        }
        const res = await fetch('/searchPost', {
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
                    setPostsArr(postsArr => [...postsArr, <Post 
                        refresh={scoreboard}
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
                    setLatArr(latArr => [...latArr, item.elem1.latitude]);
                    setLngArr(lngArr => [...lngArr, item.elem1.longitude]);
                })
            });
        });
    }

    function scoreboard() {
        const arr = [];
        fetch('/scores', {
            method: 'GET',
            headers: { 
                Accept: 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.json())
        .then(data => {
            for(const elem in data) {
                arr.push(<ScoreboardRow username={data[elem].username} score={data[elem].score} />);
            }
            setScoresArr(arr);
        }).catch((error) => {
            alert("Error: " + error);
        });
    }

    function newPostChanged() {
        settitleVal(newPost.current.value);
    }

    function feedScrolled() {
        console.log(currentBuffer);
        console.log(feedRef.current.scrollTop);
        if(prevScroll < feedRef.current.scrollTop) {
            if(feedRef.current.scrollTop > currentBuffer) { 
                setCurrentBuffer(currentBuffer + 470);
                setCounter(counter + 1);
            }
        } else {
            if(feedRef.current.scrollTop < currentBuffer - 470) {
                setCurrentBuffer(currentBuffer - 470);
                setCounter(counter - 1);
            }
        }
        if(counter < 0) {
            setCurrentBuffer(470);
            setCounter(0);
        }
        setMarkerElement(<FaMapMarkerAlt size={20} className="markerElement" lat={latArr[counter]} lng={lngArr[counter]} />);
        setPrevScroll(feedRef.current.scrollTop);
    }

    return(
        <div className="back">
            <div className="dashboard">
                <div className="newPost">
                    <input type="text" placeholder="New Post" ref={newPost} onChange={() => newPostChanged()} className="titleInput" />
                    <AiFillPlusCircle size={30} onClick={() => togglePopup()} className="addButton" />
                </div>
                <div ref={feedRef} onScroll={() => feedScrolled()} className="feed" >
                    {postsArr}
                    <div className="paddingBox" ></div>
                </div>
                <div className="scoreboard">
                    <div className="scoreRowFirst">Scoreboard</div>
                    {scoresArr}
                </div>
                <div className="googleMapContainer">
                    <GoogleMapReact className="googleMap"
                        bootstrapURLKeys={{ key: "AIzaSyC2Eln9jzmA-b4P1CP8JHVqs7Y1s4eT36I" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        {markerElem}
                    </GoogleMapReact>
                </div>
                
            </div>
            <Navbar />
            {
                isOpen && <NewPost refreshPosts={refreshPosts} closeClicked={() => togglePopup()} />
            }
        </div>
    );
}

export default Home;