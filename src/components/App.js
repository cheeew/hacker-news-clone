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
import { urls } from "./Helpers";
import base from '../base';

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
    thread: {

    },
  };
  
  prepStorage = (category) => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts"));
    
    if(!storedPosts) {
      this.pullPosts(category);      
    } 
    else if (this.state.posts[category].length < 1) {
      this.pullPosts(category);
    }
    else {
      this.setState({ posts : storedPosts });
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
    if (posts[category].length > 1) posts[category] = [];
    // Get 40 post ids for each category
    const response = await fetch(urls[category]);
    const data = await response.json();      
    let postIds = data.slice(0, 20);
    // Get 40 post details for each category
    for (let id of postIds) { 
      const resp2 = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
      const data2 = await resp2.json();
      posts[category].push(data2);
    };
    this.setState({ posts });
    console.log("done");
  }

  pullComments = (id) => {
    console.log(id);
  }

  loading = (category) => {
    if(this.state.posts[category].length) return null;
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
          <Route exact path='/' testing="test">
            <Home state={this.state} 
            loading={this.loading} 
            pullPosts={this.pullPosts}
            prepStorage={this.prepStorage}
            updateStorage={this.updateStorage}
            unbindStorage={this.unbindStorage} 
            pullComments={this.pullComments} />
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
            <Submit state={this.state}/>
          </Route>
          <Route exact path='/threads'>
            <Threads state={this.state} 
            loading={this.loading}/>
          </Route>
          <Route exact path='/login'>
            <Login state={this.state}/>
          </Route>
          <Route exact path='/item/:itemId' component={PostThread} />
        </Switch>
      </div>
    );
  }
}

export default App;
