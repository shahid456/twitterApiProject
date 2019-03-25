import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage.js";
import TweetsUsersPage from "./components/TweetsPage/TweetsUsersPage.js";
import { TWEET_PATH, USER_PATH } from "./constants/routes";
import UserTimeline from "./components/UserTimeline";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path={TWEET_PATH} component={TweetsUsersPage} />
          <Route exact path={USER_PATH} component={UserTimeline} />
        </Switch>
      </Router>
    );
  }
}

export default App;
