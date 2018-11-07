import React from "react";
import getPostAge from "./Helpers";
const he = require('he');

class ChildComment extends React.Component {
  render() {
    const { by, time, text, id } = this.props.details;
    return (
      <li key={id}>
        <div>
          <span className="user">{by}</span>
          <span>{` ${getPostAge(time)}`}</span>
        </div>
        <div>
          {text ? he.decode(text) : text}
        </div>
      </li>
    );
  }
}

export default ChildComment;