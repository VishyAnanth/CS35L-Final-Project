import { useEffect } from "react";
import Navbar from "../CommonComponents/Navbar";
import "./NotFound.css";

function NotFound() {

    useEffect(() => {
        document.title = "InstaPowellCat | Error 404";
    });

    return (
        <div>
            <Navbar />
        </div>
    );
}

export default NotFound;