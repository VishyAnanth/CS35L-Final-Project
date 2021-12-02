import './UserResult.css'
import {CgProfile} from 'react-icons/cg'
import { useRef } from 'react';

function UserResult(props) {    //Displays a small box of users in search bar return results

    const usernameRef = useRef(null);

    function userResultClicked() {      //get the profile page of the user clicked
        localStorage.setItem('currentUsername', usernameRef.current.innerHTML);
        window.location.href = '/profile';
    }

    return (
        <div className="userResultContainer">
            <CgProfile size={30} />
            <div onClick={() => userResultClicked()} ref={usernameRef} className="usernameClass">{props.username}</div>
        </div>
    );
}

export default UserResult;