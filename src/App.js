import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./app.css";
import { connect } from "react-redux";
import * as actions from "./actions";

import Landing from "./pages/Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// Using the class-based component so we could access life cycle methods
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
