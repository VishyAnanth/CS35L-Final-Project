import Sightings from './Sightings';
import Scoreboard from './Scoreboard.js';
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';

import './App.css';


class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <React.Fragment>
            <Navigation />
            <main className="main-menu-content">
              <Routes>
                <Route path='/Sightings.js' element={<Sightings/>} />
                <Route path='/Scoreboard.js' element={<Scoreboard/>} />
              </Routes>
            </main>

          </React.Fragment>
        </BrowserRouter>
      );
    }
  }
  
  export default App;
