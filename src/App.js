import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage.js";
import TweetsUsersPage from "./components/TweetsPage/TweetsUsersPage.js";
import { TWEET_PATH, USER_PATH, USER_SEARCH_PATH } from "./constants/routes";
import UserTimeline from "./components/UserTimeline";
import UserPageSearch from "./components/UserPageSearch/UserPageSearch";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path={TWEET_PATH} component={TweetsUsersPage} />
          <Route path={USER_PATH} component={UserTimeline} />
          <Route path={USER_SEARCH_PATH} component={UserPageSearch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
