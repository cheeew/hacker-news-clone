import React from "react";
import getPostAge from "./Helpers"

class PostListing extends React.Component {
  render() {
    return (
      <div className="post-wrapper">
        <div className="post">
          <ul>
            <li>#.</li>
            <i className="fas fa-caret-up"></i>
            <li className="post-title">This is a sample post</li>
            <li>(examplelink.com)</li>
          </ul>
        </div>
        <div className="post-options">
          <ul>
            <li className='post-score'>x points by</li>
            <li className='user'>user</li>
            <li className="post-age">{getPostAge()}</li>
            <span>|</span>
            <li>hide</li>
            <span>|</span>
            <li>x comments</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PostListing;
