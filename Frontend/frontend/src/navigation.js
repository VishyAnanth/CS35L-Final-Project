import React from "react";
import { NavLink } from 'react-router-dom';

const Navigation = props => (
    <React.Fragment> 
        <li
        className="list-group list-group-flush"
      >
        <span>        
        <h4 class="list-group-item-heading"><NavLink to="/Scoreboard.js">Scoreboard</NavLink> </h4>
        <p class="list-group-item-text">Tracks the number of times each user reported a PCS (Powell Cat Sighting).</p>
   
        </span>

        <span>
        <h4 class="list-group-item-heading"><NavLink to="/Sightings.js">Sighting Reports</NavLink></h4>
        <p class="list-group-item-text">Feed of sighting reports.</p>

        </span>
      </li>
     
</React.Fragment>
);

export default Navigation;