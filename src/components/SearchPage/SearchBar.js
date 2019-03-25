import React from "react";
import { DebounceInput } from "react-debounce-input";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { TWEET_PATH, USER_PATH } from "../../constants/routes";
import "../../index.css";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchBar">
        <div>
          <DebounceInput
            id="searchin"
            minLength={1}
            debounceTimeout={300}
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
        <div style={{ "background-color": "aqua" }}>
          <ul className="list">
            {this.props.predictions.map((item, index) => (
              <li key={index + item}>
                {item == "See All Results" ? (
                  <Link to={{ pathname: TWEET_PATH, state: this.props.value }}>
                    See All Results
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: USER_PATH,
                      state: this.props.userNames[index]
                    }}
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchBar;
