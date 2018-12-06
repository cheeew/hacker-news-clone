import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
// import base from "../base";
import Comments from "./Comments";
import Footer from "./Footer";
import Jobs from "./Jobs";
import Header from "./Header";
import New from "./New";
import PostThread from "./PostThread";
import Show from "./Show";
import { urls, fetchItems, paginatePosts } from "./Helpers";
import User from "./User";

 class App extends React.Component {
  state = {
    posts: {
      ask: [],
      comments: [],
      jobs: [],
      new: [],
      show: [],
      top: []
    },
    currentThread: {
      comments: [],
      childComments: [],
      details: [],
    },
    page: 1,
    user: {

    }
  };

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  prepStorage = (category) => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts"));
    const { posts } = this.state;

    // Pull posts if category posts don't exist, else pull from session storage
    if(!storedPosts || posts[category].length < 1) {
      this.pullPosts(category);
    } else {
      this.setState({ posts : storedPosts });
    }

    const { comments } = this.state.currentThread;
    let currentThread = {...this.state.currentThread};
    // Reset "Current Thread" state object
    if(comments.length > 0) {
      currentThread.childComments = [];
      currentThread.comments = [];
      currentThread.details = {};
      currentThread.id = "";
      this.setState({ currentThread });
    }

  }

  updateStorage = () => {
    const { posts } = this.state;
    sessionStorage.setItem( "posts", JSON.stringify(posts));
  }

  unbindStorage = () => {
    // base.removeBinding(this.postsRef);
  }

  pullPosts = async (category, x, y) => {
    if(!x) this.setState({ page: 1 });
    let posts = { ...this.state.posts };
    // If previous posts exists, clear array for new posts
    if (posts[category].length > 1) {
      posts[category] = [];
      this.setState({ posts });
    }
    // Get 30 post ids within the specified category
    const response = await fetch(urls[category]);
    const data = await response.json();

    let postIds = data.slice(x || 0, y || 30);

    // Get post details for above 30 posts
    await fetchItems(postIds, posts[category]);
    // Set state
    this.setState({ posts });
    console.log("done");
  }

  paginate = async(category) => {
    const { page } = this.state;
    const indexes = paginatePosts(page);
    this.pullPosts(category, ...indexes);
    // last thing
    this.setState({ page: page + 1 });
  }

  resetPage = (num) => {
    const page = num || 1;
    this.setState({page});
  }

  updateCurrentThread = (obj) => {
    let currentThread = {...this.state.currentThread};
    currentThread = obj;
    this.setState({ currentThread });
  }

  updateComments = (obj) => {
    let posts = {...this.state.posts};
    posts.comments = obj;
    this.setState({ posts });
  }

  updateChildComments = (obj) => {
    let currentThread = {...this.state.currentThread};
    currentThread.childComments = obj;
    this.setState({ currentThread });
  }

  updateUser = (obj) => {
    let user = {...this.state.user};
    user = obj;
    this.setState({ user });
  }

  loading = (category) => {
    const { posts } = this.state;
    if(posts[category].length) return null;
    return (
      <li className="load-screen">
        { category === "comments"
        ? <span>Pulling most recent comments from HackerNews.</span>
        : <span>Pulling latest posts from HackerNews.</span> }
        <span>This should only take a few seconds.</span>
        <div className="ball-container">
          <span className="ball" />
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className="canvas">
        <Header company="News Clone" />
        <Switch>
          <Route exact path='/' render={(props) =>
            <Home
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage}
            paginate={this.paginate}
            resetPage={this.resetPage}
            />}
          />
          <Route exact path='/news/:pageId' render={(props) =>
            <Home
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage}
            paginate={this.paginate}
            resetPage={this.resetPage}
            />}
          />
          <Route exact path='/ask' render={(props) =>
            <Ask
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            paginate={this.paginate}
            unbindStorage={this.unbindStorage} />}
          />
          <Route exact path='/ask/:pageId' render={(props) =>
            <Ask
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            paginate={this.paginate}
            unbindStorage={this.unbindStorage} />}
          />
          <Route exact path='/comments' render={(props) =>
            <Comments
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateComments = {this.updateComments}
            paginate={this.paginate}
            updateStorage={this.updateStorage}/>}
          />
          <Route exact path='/comments/:pageId' render={(props) =>
            <Comments
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateComments = {this.updateComments}
            paginate={this.paginate}
            updateStorage={this.updateStorage}/>}
          />
          <Route exact path='/jobs' render={(props) =>
            <Jobs
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} />}
          />
          <Route exact path='/new' render={(props) =>
            <New
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage}
            paginate={this.paginate}
            resetPage={this.resetPage}/>}
          />
          <Route exact path='/new/:pageId' render={(props) =>
            <New
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            paginate={this.paginate}
            unbindStorage={this.unbindStorage}
            resetPage={this.resetPage}/>}
          />
          <Route exact path='/show' render={(props) =>
            <Show
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            paginate={this.paginate}
            unbindStorage={this.unbindStorage}/>}
          />
          <Route exact path='/show/:pageId' render={(props) =>
            <Show
            {...props}
            state={this.state}
            loading={this.loading}
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            paginate={this.paginate}
            unbindStorage={this.unbindStorage}/>}
          />
          <Route exact path='/item/:itemId' render={(props) =>
            <PostThread
            {...props}
            state={this.state}
            update={this.updateCurrentThread}
            updateChildComments={this.updateChildComments} />}
          />
          <Route exact path='/user/:username' render={(props) =>
            <User {...props}
            updateUser={this.updateUser}
            user={this.state.user}/>}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
