
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp"
import Database from "./components/Database"
import SearchResults from "./components/SearchResults/SearchResults"
import Database2 from "./components/combination"
import SearchPage from "./components/SearchPage"
import Tester from "./components/demo"


// This is all the url routing.
function MainPage() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/database" component={Database} />
        <Route exact path="/signupwithdatabase" component={Database2} />
        <Route exact path="/search_page" component={SearchPage} />
        <Route exact path="/search_results" component={SearchResults} />
        <Route exact path="/demo" component={Tester} />
    </Router>
  );

}

// This is the component that will be shown by default
export default MainPage;
