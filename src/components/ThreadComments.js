import React from "react";
import getPostAge from "./Helpers";
import ChildComment from "./ChildComment";
const he = require('he');
class ThreadComments extends React.Component {  
  render() {
    const { text, by, time, kids, id } = this.props.comment;
    const { childComments } = this.props.state.currentThread;
    const nestComments = () => {
      return (
        <ul className="child-comment-container">
          {childComments.filter(comment => comment['parent'] === id)
            .map(comment => {
              return (
                <ChildComment key={comment['id']} 
                details={comment} />
              );
            })
          }
        </ul>
      );
    };
    
    return (
      <li>
        <div>
          <p className="comment-time">
            <span>
              {by}
            </span>
            <span>
              {` ${getPostAge(time)}`}
            </span>
          </p>
        </div>
        <div>
          <p className="comment">
            {text ? he.decode(text) : text}
          </p>
        </div>
        { kids ? nestComments() : null }
      </li>
    );
  }
}

export default ThreadComments;