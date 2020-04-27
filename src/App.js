import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./container/Home";
import Login from "./container/Login";
import Signup from "./container/Signup";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    </AuthProvider>
  )
}


export default App;
