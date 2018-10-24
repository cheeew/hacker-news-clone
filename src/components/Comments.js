import React from "react";
import Header from "./Header";

class Comments extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header company="News Clone"/>
        <div className="canvas">
          <p>this is the comments.js component.</p>
        </div>
      </div>
    );
  }
}

export default Comments;
