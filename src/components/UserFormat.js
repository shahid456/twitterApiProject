import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { USER_PATH } from "../constants/routes";
class UserFormat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          top: this.props.style.top,
          height: this.props.style.height,
          position: this.props.style.position,
          width: "50%"
        }}
        className="userItem"
      >
        <header>
          <img
            src={this.props.user["profile_image_url"]}
            className="profile-thumbnail"
          />
          <div className="profile-name">
            <Link
              to={{
                pathname: USER_PATH,
                state: this.props.user["screen_name"]
              }}
            >
              <h3>{this.props.user["name"]}</h3>
            </Link>
            <h4>{this.props.user["screen_name"]}</h4>
          </div>
        </header>
        <div>
          <p>{this.props.user["description"]}</p>
        </div>
        <hr />
      </div>
    );
  }
}
export default UserFormat;
