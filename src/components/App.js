import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
import Comments from "./Comments";
import Jobs from "./Jobs";
import Header from "./Header";
import Login from "./Login";
import New from "./New";
import PostThread from "./PostThread";
import Show from "./Show";
import Submit from "./Submit";
import Threads from "./Threads";
import { urls, fetchItems } from "./Helpers";
// import base from '../base';
 class App extends React.Component {
  state = {
    posts: {
      ask: [],
      comments: [],
      jobs: [],
      new: [],
      show: [],
      threads: [],
      top: [],
    },
    currentThread: {
      comments: [],
      details: [],
      id: '',
    },
  };
  
  prepStorage = (category) => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts"));
    const { posts } = this.state;
    // Pull posts if category posts don't exist, else pull from session storage
    if(!storedPosts || posts[category].length < 1) {
      this.pullPosts(category);      
    } else {
      this.setState({ posts : storedPosts });
    }
    
    const {comments} = this.state.currentThread;
    let currentThread = {...this.state.currentThread};
    // Reset "Current Thread" state object
    if(comments.length > 0) { 
      currentThread.comments = [];
      currentThread.details = {};
      currentThread.id = "";
      this.setState({ currentThread });
    }
    
    // this.postsRef = base.syncState(`posts/${category}`, {
    //   context: this,
    //   state: category,
    // });
  }
  
  updateStorage = () => {
    const { posts } = this.state;
    sessionStorage.setItem( "posts", JSON.stringify(posts));
  }
  
  unbindStorage = () => {
    // base.removeBinding(this.postsRef);
  }

  pullPosts = async (category) => {
    let posts = { ...this.state.posts };
    // If previous posts exists, clear array for new posts
    if (posts[category].length > 1) {
      posts[category] = [];
    }
    // Get 20 post ids within the specified category
    const response = await fetch(urls[category]);
    const data = await response.json();      
    let postIds = data.slice(0, 20);
    // Get post details for above 20 posts
    await fetchItems(postIds, posts[category]);
    // Set state
    this.setState({ posts });
    console.log("done");
  }

  
  setId = (postId) => {
    let currentThread = {...this.state.currentThread};
    currentThread.id = postId;
    this.setState({ currentThread });
  }

  updateCurrentThread = (obj) => {
    let currentThread = {...this.state.currentThread};
    currentThread = obj;
    this.setState({ currentThread });
  }

  loading = (category) => {
    const { posts } = this.state;
    if(posts[category].length) return null;
    return (
      <React.Fragment>
        <li>Pulling posts from HackerNews.</li>
        <li>This should only take a few seconds...</li>
      </React.Fragment>
    );
  }


  render() {
    return (
      <div className="canvas">
        <Header company="News Clone" />
        <Switch>
          <Route exact path='/'>
            <Home state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} 
            setId={this.setId} />
          </Route>
          <Route exact path='/ask'>
            <Ask state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} />
          </Route>
          <Route exact path='/comments'>
            <Comments state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}/>
          </Route>
          <Route exact path='/jobs'>
            <Jobs state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} />
          </Route>
          <Route exact path='/new'>      
            <New state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} />
          </Route>
          <Route exact path='/show'>
            <Show state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} />
          </Route>
          <Route exact path='/submit'>
            <Submit state={this.state} />
          </Route>
          <Route exact path='/threads'>
            <Threads state={this.state} 
            loading={this.loading}/>
          </Route>
          <Route exact path='/login'>
            <Login state={this.state} />
          </Route>
          <Route path='/item/:itemId'>
            <PostThread state={this.state}
            update={this.updateCurrentThread}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
