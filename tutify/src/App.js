import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./Main";
import SignUp from "./SignUp"
import Database from "./Database"

// This is all the url routing.
function MainPage() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/database" component={Database} />
    </Router>
  );
}

// This is the component that will be shown by default
export default MainPage;
