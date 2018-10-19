import React from "react";
import PostListing from "./PostListing";

class Comments extends React.Component {
  render() {
    return (
      <div className="comments-wrapper">
        <p>this is the comments.js component.</p>
        <PostListing />
      </div>
    );
  }
}

export default Comments;
