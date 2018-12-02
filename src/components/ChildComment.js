import React from "react";
import { Link } from "react-router-dom";
import getPostAge from "./Helpers";
class ChildComment extends React.Component {

  render() {
    const { by, time, text, id } = this.props.details;
    const createMarkup = () => {
      return {__html: text};
    }

    return (
      <li className="child-comment" key={id}>
        <div className='child-heading'>
          <span className="user">
            <Link exact="true" to={`/user/${by}`}>{by}</Link>
          </span>
          <span>{` ${getPostAge(time)}`}</span>
        </div>
        <div className="reply" dangerouslySetInnerHTML={createMarkup()} />
      </li>
    );
  }
}

export default ChildComment;