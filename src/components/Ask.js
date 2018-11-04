import React from "react";
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";

class Ask extends React.Component {

  componentDidMount() {
    this.props.prepStorage('ask');
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
        <LoadButton pullPosts={() => this.props.pullPosts('ask')}/>
        <ul className="post-wrapper">
          { this.props.loading('ask') }
          {Object.entries(this.props.state.posts.ask).map(post => (
            <PostListing key={post[1]["id"]} 
            index={Number(post[0])} 
            details={post[1]}
            id={post[1]["id"]}
            state={this.props.state}
            setId={this.props.setId} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Ask;
