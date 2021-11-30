import React from "react";
import { NavLink } from 'react-router-dom';

import './navigation.css';
const Navigation = props => (
    <header className="main-page">
    <div className="main_menu">
       <NavLink to="/App.js"><h1 title="Main Menu">Powell Cat Tracker</h1></NavLink>
    </div>
    <nav className="main-page__items">
      <ul>
        <li>
          <NavLink to="/Scoreboard.js">Scoreboard</NavLink>
        </li>
        <li>
          <NavLink to="/Sightings.js">Sightings</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;