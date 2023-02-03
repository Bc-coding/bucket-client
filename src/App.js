import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./app.css";
import { connect } from "react-redux";
import * as actions from "./actions";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Using the class-based component so we could access life cycle methods
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
