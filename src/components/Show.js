import React from "react";
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";
class Show extends React.Component {

  componentDidMount() {
    this.props.prepStorage('show');
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
        <LoadButton pullPosts={() => this.props.pullPosts('show')}/>
        <ul className="post-wrapper">
          { this.props.loading('show') }
          {Object.entries(this.props.state.posts.show).map(post => (
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

export default Show;
