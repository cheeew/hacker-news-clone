import React from "react";
import LoadButton from './LoadButton';
import ThreadComments from "./ThreadComments";
import { getRecentComments, fetchItem } from "./Helpers";

class Comments extends React.Component {
  
  async componentDidMount() {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts"));
    const { posts } = this.props.state;

    if(!storedPosts || posts["comments"].length < 1) {
      this.retrieveComments();
    } else {
      this.props.prepStorage('comments');
    }

    this.getParent();

    const {comments} = this.props.state.currentThread;
    let currentThread = {...this.props.state.currentThread};
    // Reset "Current Thread" state object
    if(comments.length > 0) { 
      currentThread.childComments = [];
      currentThread.comments = [];
      currentThread.details = {};
      currentThread.id = "";
      this.setState({ currentThread });
    }
  }

  componentWillUpdate() {
    this.props.updateStorage();
  }

  getParent = async() => {
    const resp = await fetchItem(18402931);
    const data = await resp.json();

    console.log(data);
  }
  
  retrieveComments = async () => {
    const comments = await getRecentComments();
    this.props.updateComments(comments);
  }

  render() {
    const { comments } = this.props.state.posts;

    return (
      <div className="main">
        <LoadButton pullPosts={() => this.retrieveComments()} />
        <ul className="post-wrapper comment-thread">
        { this.props.loading("comments") }
          {comments.filter(c => !c['deleted']).map(comment => (
            <ThreadComments 
            key={comment.id}
            comment={comment}
            state={this.props.state} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Comments;
