import React from "react";
import SearchBar from "./SearchBar.js";
import { getUrl } from "../../utils/getUrl.js";
import { Link } from "react-router-dom";
import { TWEET_PATH } from "../../constants/routes.js";
import "../../index.css";
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Search">
        <img
          src="https://sguru.org/wp-content/uploads/2018/02/twitter_logo.png"
          className="dimension"
        />
        <SearchBar />
      </div>
    );
  }
}

export default SearchPage;
