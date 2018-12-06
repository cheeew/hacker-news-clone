import React from "react";
import { Link } from "react-router-dom";
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
    const { page, posts } = this.props.state;
    const pagination = posts.ask.length > 0 ? <p>More</p> : null;
    return (
      <div className="main">
        <Link
        exact='true'
        className="refresh"
        to='/ask'
        >
          <LoadButton pullPosts={() => this.props.pullPosts('ask')}/>
        </Link>
        <div className='post-wrapper container'>
          <ul className="post-wrapper">
            { this.props.loading('ask') }
            {Object.entries(posts.ask).map(post => (
              <PostListing key={post[1]["id"]}
              index={Number(post[0]) + 1}
              details={post[1]}
              id={post[1]["id"]}
              state={this.props.state} />
            ))}
          </ul>
          <Link
            className='pagination'
            style={{ textDecoration: "none" }}
            exact='true' to={`/ask/page-${page + 1}`}
            onClick={() => this.props.paginate('ask')}
            >
              {pagination}
            </Link>
        </div>
      </div>
    );
  }
}

export default Ask;
