import React from "react";
import { Link } from "react-router-dom";
import getPostAge from "./Helpers";
import ChildComment from "./ChildComment";

class ThreadComments extends React.Component {  
  
  createMarkup = () => {
    const { text } = this.props.comment;
    return {__html: text};
  }

  render() {
    const { by, time, kids, id, parentPost, parent } = this.props.comment;
    const { childComments } = this.props.state.currentThread;

    const nestComments = () => {
      return (
        <ul className="child-comment-container">
          {childComments.filter(comment => comment['parent'] === id && !comment['deleted'])
            .map(comment => <ChildComment key={comment['id']} details={comment} />
          )}
        </ul>
      );
    };
    
    return (
      <li>
        <div className="comment-heading">
          <span>
            <Link exact='true' to={`/user/${by}`}>
              {by}
            </Link>
          </span>
          <span>
            {` ${getPostAge(time)}`}
          </span>
          { parentPost && parentPost.id !== parent
            ? <span> |  
                <Link className="parent-title" 
                exact="true" 
                to={`/item/${parent}`}>
                Parent
                </Link> | on: 
                <Link className="parent-title" 
                exact="true" 
                to={`/item/${parentPost.id}`}>
                  {`${parentPost.title}`}
                </Link> 
              </span>
            : null  }

          { parentPost && parentPost.id === parent 
            ? <span> | on: 
                <Link className="parent-title" 
                exact="true" 
                to={`/item/${parentPost.id}`}>
                  {`${parentPost.title}`}
                </Link> 
              </span>
            : null }
        </div>
        <div className="head-comment" dangerouslySetInnerHTML={this.createMarkup()} />
        { kids ? nestComments() : null }
      </li>
    );
  }
}

export default ThreadComments;