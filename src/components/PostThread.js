import React from 'react';

class PostThread extends React.Component {
  state = {
    threadDetails: {

    },
  }

  componentDidMount() {
    const postId = this.props.match.params.itemId;
    const url = `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let threadDetails = {...this.state.threadDetails};
        threadDetails = data;
        this.setState({ threadDetails });
      });
  }

  loading = () => {
    if(this.state.comments.length) return null;
    return (
      <React.Fragment>
        <li>Pulling comments from HackerNews.</li>
        <li>This should only take a few seconds...</li>
      </React.Fragment>
    );
  }

  render() {
    const { title } = this.state.threadDetails;
    return (
      <div className="main">
        <p>{title}</p>
        <div className="comment">
          <ul>
            {}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostThread;
