import React from "react";
import Users from "../TweetsPage/Users";
import { Link } from "react-router-dom";
import SearchBar from "../SearchPage/SearchBar.js";
class UserPageSearch extends React.Component {
  render() {
    return (
      <div>
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
        <Users value={this.props.location.state} />
      </div>
    );
  }
}
export default UserPageSearch;
