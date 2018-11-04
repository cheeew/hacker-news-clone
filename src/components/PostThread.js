import React from 'react';
import ThreadComments from "./ThreadComments";
import { fetchItem, fetchItems } from "./Helpers";

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
    // upstream function to set state
    this.props.update(currentThread);
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
    const { details, comments } = this.props.state.currentThread;
    return (
      <div className="main post-thread">
        <p><a href={details.url} target={"_blank"}>{details.title}</a></p>
        <div className="comment-container">
          <ul>
            { this.loading() }
            {comments.map(comment => (
              <ThreadComments key={comment.id} comment={comment} state={this.props.state}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostThread;
