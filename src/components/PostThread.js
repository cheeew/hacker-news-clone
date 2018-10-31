import React from 'react';
import ThreadComments from "./ThreadComments";

class PostThread extends React.Component {
  state = {
    threadDetails: {

    },
    comments: [


    ],
  }

  componentDidMount() {
    let comments = [...this.state.comments];
    const postId = this.props.match.params.itemId;
    const url = `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let threadDetails = {...this.state.threadDetails};
        threadDetails = data;
        this.setState({ threadDetails });
        return data.kids.map(async thread => {
          return await fetch(`https://hacker-news.firebaseio.com/v0/item/${thread}.json?print=pretty`)
            .then(resp => resp.json())
            .then(data => comments.push(data));
        });
      });
    this.setState({ comments });
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
      <div className="main post-thread">
        <p>{title}</p>
        <div className="comment-container">
          <ul>
            { this.loading() }
            {this.state.comments.map(comment => (
              <ThreadComments key={comment["id"]} comment={comment} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostThread;
