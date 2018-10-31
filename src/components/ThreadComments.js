import React from "react";

class ThreadComments extends React.Component {
  render() {
    return (
      <li>{this.props.comment["text"]}</li>
    );
  }
}

export default ThreadComments;