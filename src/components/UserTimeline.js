import React from "react";
import { USER_TIMELINE, INC_ENTITIES } from "../constants/api-endpoints";
import Wrapper from "./TweetsPage/Wrapper";
import { Link } from "react-router-dom";
import { FindMin } from "../utils/findMin";
import SearchBar from "./SearchPage/SearchBar.js";
class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: true,
      isNextPageLoading: false,
      items: [],
      tweets: []
    };
  }
  setTweets = url => {
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
        this.setState({
          tweets: data
        });
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };
  _loadNextPage = (...args) => {
    this.setState({ isNextPageLoading: true }, () => {
      let value = this.props.location.state;
      let url = "";
      value = encodeURIComponent(value);
      if (this.state.items.length == 0) {
        url =
          USER_TIMELINE +
          "screen_name=" +
          value +
          INC_ENTITIES +
          "&include_rts=true";
      } else {
        url =
          USER_TIMELINE +
          "screen_name=" +
          value +
          INC_ENTITIES +
          "&max_id=" +
          (FindMin(this.state.tweets) - 100) +
          "&include_rts=true";
      }
      this.setTweets(url);
      setTimeout(() => {
        this.setState(state => ({
          hasNextPage: state.items.length < 100,
          isNextPageLoading: false,
          items: [...state.items].concat(...state.tweets)
        }));
      }, 2500);
    });
  };

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
          <h1 className="textAlign">Twitter API</h1>
          <div style={{ width: "30%", "margin-top": "30px" }}>
            <SearchBar width="13.6%" margin="0.4%" />
          </div>
        </div>
        <div className="userBar">
          <h1>{this.props.location.state}</h1>
        </div>
        <Wrapper
          hasNextPage={this.state.hasNextPage}
          isNextPageLoading={this.state.isNextPageLoading}
          items={this.state.items}
          loadNextPage={this._loadNextPage}
          Page="Tweets"
          itemSize={250}
        />
      </div>
    );
  }
}

export default UsersPage;
