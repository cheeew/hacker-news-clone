import React from "react";
import getPostAge, { fetchItems } from "./Helpers";
const he = require('he');
class ThreadComments extends React.Component {
  componentDidMount() {
    const { comment } = this.props;
    let childComments = [];
    
    if (comment["kids"]) {
      fetchItems(comment["kids"], childComments);
    }
    // console.log(childComments);
  }

  render() {
    const { text, by, time } = this.props.comment;
    
    return (
      <li>
        <div>
          <p className="comment-time">
            {`${by} ${getPostAge(time)}`}
          </p>
        </div>
        <div>
          <p className="comment">
            {text ? he.decode(text) : text}
          </p>
        </div>

      </li>
    );
  }
}

export default ThreadComments;