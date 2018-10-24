import React from "react";

class LoadButton extends React.Component {
  render() {
    return (
      <div className="button-container">
        <div className="button-background" onClick={() => this.props.pullPosts()}>
          <span>
            Refresh Posts
          </span>
        </div>
      </div>
    );
  }
}

export default LoadButton;