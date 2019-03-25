import React from "react";
import { DebounceInput } from "react-debounce-input";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  TWEET_PATH,
  USER_PATH,
  USER_SEARCH_PATH
} from "../../constants/routes";
import "../../index.css";
import { getUrl } from "../../utils/getUrl.js";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      predictions: [],
      userNames: []
    };
  }

  getPredictions = (data, value) => {
    let predicted = [];
    let predictedUserNames = [];
    if (value[0] == "@") {
      let name = "@" + data["screen_name"] + " " + data["name"];
      predicted.push(name);
      predictedUserNames.push(data["screen_name"]);
    } else {
      let len = 0;
      data.length > 4 ? (len = 5) : (len = data.length);
      for (let k = 0; k < len; k++) {
        predicted.push(data[k]["name"]);
        predictedUserNames.push(data[k]["screen_name"]);
      }
    }
    return [predicted, predictedUserNames];
  };

  updateState = value => {
    let url = getUrl(value);
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return null;
        }
        return response.json();
      })
      .then(data => {
        let predicted = this.getPredictions(data, value);
        predicted[0].push("See All Results");
        this.setState({
          predictions: predicted[0],
          userNames: predicted[1]
        });
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
    if (this.state.value.length > 1) {
      this.updateState(this.state.value);
    } else {
      this.setState({
        predictions: [],
        userNames: []
      });
    }
  };

  render() {
    return (
      <div className="SearchPage">
        <div className="SearchBar">
          <div>
            <DebounceInput
              id="searchin"
              minLength={1}
              debounceTimeout={300}
              type="text"
              value={this.props.value}
              onChange={this.onChange}
            />
          </div>
          <div style={{ "background-color": "#909e9e" }}>
            <ul
              className="list"
              style={{
                width: this.props.width,
                "margin-left": this.props.margin
              }}
            >
              {this.state.predictions.map((item, index) => (
                <li key={index + item}>
                  {item == "See All Results" ? (
                    this.state.value[0] == "#" ? (
                      <Link
                        to={{ pathname: TWEET_PATH, state: this.state.value }}
                      >
                        See All Results
                      </Link>
                    ) : (
                      <Link
                        to={{
                          pathname: USER_SEARCH_PATH,
                          state: this.state.value
                        }}
                      >
                        See All Results
                      </Link>
                    )
                  ) : (
                    <Link
                      to={{
                        pathname: USER_PATH,
                        state: this.state.userNames[index]
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
        <div>
          <Link to={{ pathname: TWEET_PATH, state: this.state.value }}>
            <button className="btnSearch">Search</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SearchBar;
