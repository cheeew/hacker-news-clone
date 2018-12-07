import React from "react";
import { Link } from "react-router-dom";
import LoadButton from './LoadButton';
import ThreadComments from "./ThreadComments";
import { findStories } from "./Helpers";

class Comments extends React.Component {

  async componentDidMount() {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts"));
    const { posts } = this.props.state;

    if(!storedPosts || posts["comments"].length < 1) {
      this.retrieveComments();
    } else {
      this.props.prepStorage('comments');
    }

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

  retrieveComments = async () => {
    let comments = [];
    this.props.updateComments(comments);
    comments =  await findStories();
    console.log(comments);
    this.props.updateComments(comments);
  }

  render() {
    const { comments } = this.props.state.posts;
    const trueComments = comments.filter(c => c && !c['deleted']);
    return (
      <div className="main comments">
        <Link
        exact='true'
        className="refresh"
        to='/comments'
        >
          <LoadButton pullPosts={this.retrieveComments} />
        </Link>
        <div className='post-wrapper container'>
          <ul className="post-wrapper comment-thread">
          { this.props.loading("comments") }
            {trueComments.map(comment => (
              <ThreadComments
              key={comment.id}
              comment={comment}
              state={this.props.state}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Comments;
