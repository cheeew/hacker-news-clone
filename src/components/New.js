import React from "react";
import { Link } from "react-router-dom"
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";

class New extends React.Component {
  componentDidMount() {
    const { prepStorage, resetPage, match } = this.props;
    if (match.url === "/new") resetPage();
    prepStorage('new');
  }

  componentDidUpdate() {
    const currentPage = this.props.location.pathname;
    if(currentPage === '/new') this.props.updateStorage();
  }

  componentWillUnmount() {
    this.props.unbindStorage();
  }

  render() {
    const { page, posts } = this.props.state;
    const pagination = posts.new.length > 0 ? <p>More</p> : null;
    return (
      <div className="main">
        <Link
          exact='true'
          className="refresh"
          to='/new'
          >
          <LoadButton pullPosts={() => this.props.pullPosts('new')}/>
        </Link>
        <div className='post-wrapper container'>
          <ul className="post-wrapper">
            { this.props.loading('new') }
            {Object.entries(posts.new).map(post => (
              <PostListing key={post[1]["id"]}
              index={Number(post[0]) + 1}
              details={post[1]}
              id={post[1]["id"]}
              state={this.props.state}/>
            ))}
          </ul>
          <Link
          className='pagination'
          style={{ textDecoration: "none" }}
          exact='true' to={`/new/page-${page + 1}`}
          onClick={() => this.props.paginate('new')}
          >
            {pagination}
          </Link>
        </div>
      </div>
    );
  }
}

export default New;
