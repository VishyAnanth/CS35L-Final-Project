import { useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import './ScoreboardRow.css'

function ScoreboardRow(props) {
    const usernameRef = useRef(null);

    function navigateToProfile() {
        localStorage.setItem('currentUsername', usernameRef.current.innerHTML);
        window.location.href = '/profile';
    }

    return (
        <div className="scoreboardRowContainer" onClick={() => navigateToProfile()}>
            <CgProfile className="userlogo" size={30} />
            <div ref={usernameRef} className="scoreboardUsername">{props.username}</div>
            <div className="score">{props.score}</div>
        </div>
    );  
}

export default ScoreboardRow;