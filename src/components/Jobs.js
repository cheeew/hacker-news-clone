import React from "react";
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
    return (
      <div className="main">
        <LoadButton pullPosts={() => this.props.pullPosts('jobs')}/>
        <ul className="post-wrapper">
          { this.props.loading('jobs') }
          {Object.entries(this.props.state.posts.jobs).map(post => (
            <PostListing key={post[1]["id"]} 
            index={Number(post[0])} 
            details={post[1]} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Jobs;
