import React from "react";
import { Link } from "react-router-dom";
import getPostAge, { shortUrl } from "./Helpers";

class PostListing extends React.Component {
  render() {
    const {by, descendants, score, time, title, url} = this.props.details;
    const { page } = this.props.state;
    const index = page > 1
    ? (this.props.index) + ((page - 1) * 30)
    : this.props.index;

    return (
      <li>
        <div className="post">
          <p className="index">{index}.</p>
          <p>
            <a href={url} target={"_blank"}>
              {title}
            </a>
            <span>{(url) ? shortUrl(url) : null}</span>
          </p>
        </div>
        <div className="post-options">
          <p>{score} points by</p>
          <p>
            <Link exact='true' to={`/user/${by}`}>
            {by}
            </Link>
          </p>
          <p>{getPostAge(time)}</p>
          <span>|</span>
          <p>hide</p>
          <span>|</span>
          <p>
            <Link exact="true" to={`/item/${this.props.id}`}>
              {descendants ? `${descendants} comments` : "discuss"}
            </Link>
          </p>
        </div>
      </li>
    );
  }
}

export default PostListing;
