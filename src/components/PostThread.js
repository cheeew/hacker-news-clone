import React from 'react';
import ThreadComments from "./ThreadComments";
import getPostAge, { fetchItem, fetchItems, shortUrl } from "./Helpers";

class PostThread extends React.Component {

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate() {
    // console.log(this.props.state.currentThread.comments);
  }

  getComments = async () => {
    let currentThread = {...this.props.state.currentThread};
    // if previous comments exist, clear array for new comments
    if (currentThread.comments.length > 0) currentThread.comments = [];
    // fetch selected post thread
    const postId = currentThread.id;
    const response = await fetchItem(postId);
    const data = await response.json();
    currentThread.details = data;
    let comments = data.kids;
    // get all root comments of selected post
    await fetchItems(comments, currentThread["comments"]);
    const childComments = await this.getChildComments();
    // upstream function to set state
    this.props.update(currentThread);
    this.props.updateChildComments(childComments);
  }

  getChildComments = async () => {
    let container = [];
    const { comments } = this.props.state.currentThread;
    for (let comment of comments) {
      const children = comment.kids;
      if(children) await fetchItems(children, container);
    }
    return container;
  }

  loading = () => {
    const { comments } = this.props.state.currentThread;
    if(comments.length) return null;
    return (
      <React.Fragment>
        <li>Pulling comments from HackerNews.</li>
        <li>This should only take a few seconds...</li>
      </React.Fragment>
    );
  }

  render() {
    const { comments } = this.props.state.currentThread;
    const { score, time, title, url, by, descendants } = this.props.state.currentThread.details;
    return (
      <div className="main post-thread">
        <div>
          <div className="post-title">
            <p><a href={url} target={"_blank"}>{title}</a></p>
            <p>{url ? shortUrl(url) : url}</p>
          </div>
          <div className="post-stats">
            <p>{score ? `${score} points by` : null}</p>
            <p>{by ? `${by}` : null}</p>
            <p>{time ? `${getPostAge(time)} |` : null}</p>
            <p>{descendants ? `${descendants} comments` : null}</p>
          </div>
        </div>
        <div className="comment-container">
          <ul>
            { this.loading() }
            {comments.map(comment => (
              <ThreadComments key={comment.id} 
              comment={comment} 
              state={this.props.state} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostThread;
