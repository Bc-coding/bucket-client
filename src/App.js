import React, { useEffect, useState } from "react";

import { BrowserRouter, Route } from "react-router-dom";
// import "./app.css";
import { connect } from "react-redux";
import * as actions from "./actions";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AuthContext from "./context/authContext";

// Using the class-based component so we could access life cycle methods
const App = () => {
  const [user, setUser] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isUserLoggedIn, setIsUserLoggedIn }}
    >
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default connect(null, actions)(App);
