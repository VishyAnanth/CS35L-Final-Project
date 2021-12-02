import { createRef, useEffect, useRef, useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import GoogleMapReact from "google-map-react";

import {FaMapMarkerAlt} from 'react-icons/fa'

import './NewPost.css'

function NewPost(props) {
    const [selected, setSelected] = useState("5");
    const titleRef = createRef(null);
    const captionRef = createRef(null);
    const moodRef = createRef(null);
    const imageRef = createRef(null);
    const [markerElement, setMarkerElement] = useState(null);
    const [latElem, setLatElem] = useState(0.0); 
    const [lngElem, setLngElem] = useState(0.0); 

    const [imagebase64, setimagebase64] = useState("");

    const defaultProps = {
        center: {
          lat: 34.072222,
          lng: -118.444167
        },
        zoom: 16
    };

    function selectedChanged(event) {
        setSelected(event.target.value);
    }

    function postData() {
        const titleVal = titleRef.current.value;
        const captionVal = captionRef.current.value;
        const imageFileName = imageRef.current.value;
        const moodVal = moodRef.current.value;

        if(titleVal === "") {
            alert("Invalid title");
        } else if(captionVal === "") {
            alert("Invalid caption")
        } else if(imageFileName === "") {
            alert("Invalid image");
        } else {
            const data = {
                "id":"",
                "base64": imagebase64,
                "title": titleVal,
                "caption": captionVal,
                "posterId":"",
                "posterUsername":"",
                "latitude":latElem,
                "longitude":lngElem,
                "date":"",
                "mood":moodVal,
                "upvotes":0,
                "downvotes":0
            }
            fetch('/post', {
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
                    props.refreshPosts();
                } else {
                    alert("There was an error");
                }
            }).catch((error) => {
                alert("Error: " + error);
            });
            props.closeClicked();
        }
    }

    function imageChanged(e) {
        let reader = new FileReader();
        reader.onload = function(e) {
            setimagebase64(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function mapClicked(e) {
        setMarkerElement(<FaMapMarkerAlt size={20} className="markerElement" lat={e.lat + 0.0002} lng={e.lng - 0.0002} />);
        setLatElem(e.lat + 0.0002);
        setLngElem(e.lng - 0.0002);
    }

    return(
        <div className="newPostPopup">
            <div className="box">
                <div className="newSighting">
                    <div>New Sighting</div>
                    <AiOutlineCloseCircle size={30} onClick={props.closeClicked} className="closeButton" />
                </div>
                <input ref={titleRef} type="text" className="titleInputField" placeholder="Title"></input>
                <input ref={captionRef} type="text" className="captionInputField" placeholder="Caption" />
                <div className="newSighting">
                    <div className="imageLabelContainer">Image:</div>
                    <input ref={imageRef} onChange={(e) => imageChanged(e)} type="file" className="fileInput" accept="image/*" />
                </div>
                <div className="newSighting">
                    <div className="imageLabelContainer">Mood:</div>
                    <select ref={moodRef} className="selectClass" value={selected} onChange={selectedChanged}>
                        <option value="1">😡</option>
                        <option value="2">😔</option>
                        <option value="3">😐</option>
                        <option value="4">😃</option>
                        <option value="5">😎</option>
                    </select>
                </div>
                <div className="googleMapContainer2">
                    <GoogleMapReact onClick={(e) => mapClicked(e)} className="googleMap"
                        bootstrapURLKeys={{ key: "AIzaSyC2Eln9jzmA-b4P1CP8JHVqs7Y1s4eT36I" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        {markerElement}
                    </GoogleMapReact>
                </div>
                <div className="postButton" onClick={() => postData()}>Post</div>
            </div>
        </div>
    );
}

export default NewPost;