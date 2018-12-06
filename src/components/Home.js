import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostListing from "./PostListing";
import LoadButton from "./LoadButton";

class Home extends Component {

  componentDidMount() {
    this.props.prepStorage('top');
  }

  componentDidUpdate() {
    const currentPage = this.props.location.pathname;
    if(currentPage === '/') this.props.updateStorage();
  }

  componentWillUnmount() {
    this.props.unbindStorage();
  }

  render() {
    const { page, posts } = this.props.state;
    const pagination = posts.top.length > 0 ? <p>More</p> : null;

    return (
      <div className="main">
        <Link
        exact='true'
        to='/'
        style={{ textDecoration: "none" }}
        >
          <LoadButton pullPosts={() => this.props.pullPosts('top')}/>
        </Link>
        <div className='post-wrapper container'>
          <ul className="post-wrapper">
            { this.props.loading('top') }
            {Object.entries(posts.top).map(post => (
              <PostListing key={post[1]["id"]}
              index={Number(post[0]) + 1}
              details={post[1]}
              id={post[1]["id"]}
              state={this.props.state}
              />
            ))}
          </ul>
          <Link
          className='pagination'
          style={{ textDecoration: "none" }}
          exact='true' to={`/news/page-${page + 1}`}
          onClick={() => this.props.paginate('top')}
          >
            {pagination}
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
