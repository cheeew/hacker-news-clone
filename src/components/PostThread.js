import React from 'react';
import ThreadComments from "./ThreadComments";
import getPostAge, { fetchItem, 
  fetchItems, 
  shortUrl,
 } from "./Helpers";

class PostThread extends React.Component {

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate() {
    // console.log(this.props.state.currentThread.comments);
  }

  componentWillUnmount() {
    let currentThread = {...this.props.state.currentThread};
    currentThread.details = {};
    currentThread.id = "";
    this.props.update(currentThread);
  }

  getComments = async () => {
    let currentThread = {...this.props.state.currentThread};
    // if previous comments exist, clear array for new comments
    if (currentThread.comments.length > 0) currentThread.comments = [];
    // fetch selected post thread
    const { itemId } = this.props.match.params;
    const response = await fetchItem(itemId);
    const data = await response.json();
    currentThread.details = data;
    let comments = data.kids;
    // get all root comments of selected post
    if (comments) {
      await fetchItems(comments, currentThread["comments"]);
      const childComments = await this.getChildComments();
      this.props.update(currentThread);
      this.props.updateChildComments(childComments);
    } else {
      // upstream function to set state
      this.props.update(currentThread);
    }
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
    const { currentThread } = this.props.state;
    if(comments.length || currentThread.details.descendants === 0) return null;
    return (
      <li className="load-screen">
        <span>Pulling comment thread from HackerNews.</span>
        <span>This should only take a few seconds.</span>
        <div className="ball-container">
          <span className="ball" />
        </div>
    </li>
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
            <p>{url ? shortUrl(url) : null}</p>
          </div>
          <div className="post-stats">
            <p>{score ? `${score} points by` : null}</p>
            <p>{by ? `${by}` : null}</p>
            <p>{time ? `${getPostAge(time)} |` : null}</p>
            <p>
            {descendants > 0 ? `${descendants} comments` : null}
            {descendants < 1 ? `discuss` : null}
            </p>
          </div>
        </div>
        <div className="comment-container">
          <ul className="comment-thread">
            { this.loading() }
            {comments.filter(c => !c['deleted']).map(comment => (
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
