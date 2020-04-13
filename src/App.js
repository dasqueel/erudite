import React, { useState, useEffect } from "react"
import { Route, Switch } from 'react-router-dom';
import './css/App.css';
import UserProfile from "./components/UserProfile"
import Questions from "./components/Questions"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import Register from "./components/Register";

function App() {
  return (
    <div class="App">
      <Header />
      <hr />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/questions" component={Questions} />
        <Route path={`/user/:username`} component={UserProfile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
