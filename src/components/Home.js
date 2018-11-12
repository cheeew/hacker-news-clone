import React, { Component } from 'react';
import PostListing from "./PostListing";
import LoadButton from "./LoadButton";

class Home extends Component {

  componentDidMount() {
    this.props.prepStorage('top');
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
        <LoadButton pullPosts={() => this.props.pullPosts('top')}/>
        <ul className="post-wrapper">
          { this.props.loading('top') }
          {Object.entries(this.props.state.posts.top).map(post => (
            <PostListing key={post[1]["id"]} 
            index={Number(post[0])} 
            details={post[1]}
            id={post[1]["id"]}
            state={this.props.state}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
