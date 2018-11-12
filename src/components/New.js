import React from "react";
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";

class New extends React.Component {
  componentDidMount() {
    this.props.prepStorage('new');
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
          <LoadButton pullPosts={() => this.props.pullPosts('new')}/>
          <ul className="post-wrapper">
            { this.props.loading('new') }
            {Object.entries(this.props.state.posts.new).map(post => (
              <PostListing key={post[1]["id"]} 
              index={Number(post[0])} 
              details={post[1]}
              id={post[1]["id"]}
              state={this.props.state}/>
            ))}
          </ul>
        </div>
    );
  }
}

export default New;
