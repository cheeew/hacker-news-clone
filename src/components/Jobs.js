import React from "react";
import { Link } from "react-router-dom";
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";
class Jobs extends React.Component {

  componentDidMount() {
    this.props.prepStorage('jobs');
  }

  componentDidUpdate() {
    this.props.updateStorage();
  }

  componentWillUnmount() {
    this.props.unbindStorage();
  }

  render() {
    const { posts } = this.props.state;
    const truePosts = posts.jobs.filter(post => post);
    return (
      <div className="main">
        <Link
        exact='true'
        className="refresh"
        to='/jobs'
        >
          <LoadButton pullPosts={() => this.props.pullPosts('jobs')}/>
        </Link>
        <ul className="post-wrapper">
          { this.props.loading('jobs') }
          {Object.entries(truePosts).map(post => (
            <PostListing key={post[1]["id"]}
            index={Number(post[0]) + 1}
            details={post[1]}
            state={this.props.state}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Jobs;
