import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'

function Main() {
  return (
    <BrowserRouter>
        <Switch> 
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/*' component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
    
  );
}

export default Main;