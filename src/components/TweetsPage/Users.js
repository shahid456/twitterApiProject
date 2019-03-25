import React from "react";
import Wrapper from "./Wrapper.js";
import { FindMin } from "../../utils/findMin";
import {
  TWEET_SEARCH,
  NAME_SEARCH,
  INC_ENTITIES
} from "../../constants/api-endpoints";
import "../../index.css";
import UserFormat from "../UserFormat";
class Users extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    users: [],
    page: 1
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
          users: data
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
      value = encodeURIComponent(value.slice(1, value.length));
      url =
        NAME_SEARCH + "q=" + value + "&page=" + this.state.page + "&count=10";
      this.setState({
        page: this.state.page + 1
      });
      this.setTweetsUsers(url);

      setTimeout(() => {
        this.setState(state => ({
          hasNextPage: state.items.length < 100,
          isNextPageLoading: false,
          items: [...state.items].concat(...state.users)
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
        Page="User"
        itemSize={200}
      />
    );
  }
}

export default Users;
