import React, { Fragment } from "react";
import {
  TWEET_SEARCH,
  NAME_SEARCH,
  INC_ENTITIES
} from "../../constants/api-endpoints";
import "../../index.css";
import Users from "./Users.js";
import Tweets from "./Tweets.js";
import { Link } from "react-router-dom";
import SearchBar from "../SearchPage/SearchBar";
class TweetsUsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: "users"
    };
  }
  showUsers = () => {
    this.setState({
      menu: "users"
    });
  };
  showTweets = () => {
    this.setState({
      menu: "tweets"
    });
  };
  render() {
    let btnNav1 = "btnNav1";
    let btnNav2 = "btnNav2";
    if (this.state.menu == "tweets") {
      btnNav1 = "btnNav2";
      btnNav2 = "btnNav1";
    }
    return (
      <Fragment>
        <div className="TitleBar">
          <Link to="/">
            <img
              src="https://sguru.org/wp-content/uploads/2018/02/twitter_logo.png"
              className="imgDim"
            />
          </Link>
          <h1 className="textAlign">Twitter Api</h1>
          <div style={{ width: "30%", "margin-top": "30px" }}>
            <SearchBar width="13.6%" margin="0.4%" />
          </div>
        </div>
        <div className="userBar">
          <h1>{this.props.location.state}</h1>
        </div>

        <div className="NavBar">
          <button className={btnNav1} onClick={this.showUsers}>
            Users
          </button>
          <button className={btnNav2} onClick={this.showTweets}>
            Tweets
          </button>
        </div>
        {this.state.menu == "users" ? (
          <Users value={this.props.location.state} />
        ) : (
          <Tweets value={this.props.location.state} />
        )}
      </Fragment>
    );
  }
}

export default TweetsUsersPage;
