import React from "react";
import getPostAge, { shortUrl } from "./Helpers";
import { Link } from "react-router-dom";

const Submissions = props => (
  <li>
    <div className="post">
      <p>{Number(props.index) + 1}.</p>
      <p>
        <a href={props.post.url} target={"_blank"}>
          {props.post.title}
        </a>
        <span>{(props.post.url) ? shortUrl(props.post.url) : null}</span>
      </p>
    </div>
    <div className="post-options">
      <p>{props.post.score} points by</p>
      <p>
        <Link exact='true' to={`/user/${props.post.by}`}>
        {props.post.by}
        </Link>
      </p>
      <p>{getPostAge(props.post.time)}</p>
      <span>|</span>
      <p>hide</p>
      <span>|</span>
      <p>
        <Link exact="true" to={`/item/${props.post.id}`}>
          {props.post.descendants ? `${props.post.descendants} comments` : "discuss"}
        </Link>
      </p>
    </div>
  </li>
);

export default Submissions;
