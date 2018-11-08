import React from "react";
import getPostAge from "./Helpers";
import ChildComment from "./ChildComment";

class ThreadComments extends React.Component {  
  render() {
    const { text, by, time, kids, id } = this.props.comment;
    const { childComments } = this.props.state.currentThread;

    const createMarkup = () => {
      return {__html: text};
    }
    
    const nestComments = () => {
      return (
        <ul className="child-comment-container">
          {childComments.filter(comment => comment['parent'] === id && !comment['deleted'])
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
        <div className="comment-heading">
          <span>
            {by}
          </span>
          <span>
            {` ${getPostAge(time)}`}
          </span>
        </div>
        <div className="head-comment" dangerouslySetInnerHTML={createMarkup()} />
        { kids ? nestComments() : null }
      </li>
    );
  }
}

export default ThreadComments;