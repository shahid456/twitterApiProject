import React from "react";
import Wrapper from "./Wrapper.js";
import { FindMin } from "../../utils/findMin";
import { TWEET_SEARCH, INC_ENTITIES } from "../../constants/api-endpoints";
import "../../index.css";
class Tweets extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    tweets: []
  };
  setTweetsUsers = url => {
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
          tweets: data["statuses"]
        });
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };
  _loadNextPage = (...args) => {
    this.setState({ isNextPageLoading: true }, () => {
      let url = "";
      let value = this.props.value;
      value = encodeURIComponent(value);
      if (this.state.items.length == 0) {
        url = TWEET_SEARCH + "q=" + value + INC_ENTITIES;
      } else {
        url =
          TWEET_SEARCH +
          "q=" +
          value +
          INC_ENTITIES +
          "&max_id=" +
          (FindMin(this.state.tweets) - 100);
      }

      this.setTweetsUsers(url);

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
      <Wrapper
        hasNextPage={this.state.hasNextPage}
        isNextPageLoading={this.state.isNextPageLoading}
        items={this.state.items}
        loadNextPage={this._loadNextPage}
        Page="Tweets"
        itemSize={240}
      />
    );
  }
}

export default Tweets;
