import React from "react";
import getPostAge from "./Helpers";

class PostListing extends React.Component {
  render() {
    const {by, descendants, score, time, title, url} = this.props.details; 

    return (
      <li>
        <div className="post">
          <p>{this.props.index + 1}.</p>
          <i className="fas fa-caret-up"></i>
          <p>{title}</p>
          <div>({url})</div>
        </div>
        <div className="post-options">
          <p>{score} points by</p>
          <p>{by}</p>
          <p>{getPostAge(time)}</p>
          <span>|</span>
          <p>hide</p>
          <span>|</span>
          <p>{descendants} comments</p>
        </div>
      </li>
    );
  }
}

export default PostListing;
