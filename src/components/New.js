import React from "react";
import PostListing from "./PostListing";

class New extends React.Component {
  render() {
    return (
      <div className="new-wrapper">
        <p>this is the "new" component.</p>
        <PostListing />
      </div>
    );
  }
}

export default New;
