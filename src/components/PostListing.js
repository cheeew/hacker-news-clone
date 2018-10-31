import React from "react";
import { Link} from "react-router-dom";
import getPostAge from "./Helpers";

class PostListing extends React.Component {

  onClickHandler = (id) => {
    let thread = { ...this.props.state.thread };
    thread = id;
    this.setState({ thread });
  }

  render() {
    const {by, descendants, score, time, title, url} = this.props.details; 

    return (
      <li>
        <div className="post">
          <p>{this.props.index + 1}.</p>
          <i className="fas fa-caret-up"></i>
          <p>{title}</p>
          <div>({url})</div>
        </div>
        <div className="post-options">
          <p>{score} points by</p>
          <p>{by}</p>
          <p>{getPostAge(time)}</p>
          <span>|</span>
          <p>hide</p>
          <span>|</span>
          <Link details={this.props.details} to={{pathname: `/item/${this.props.id}`}}>
            <p onClick={() => this.onClickHandler(this.props.id)}>
              {descendants} comments
            </p>
          </Link>
        </div>
      </li>
    );
  }
}

export default PostListing;
