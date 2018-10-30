import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
import Comments from "./Comments";
import Jobs from "./Jobs";
import Header from "./Header";
import Login from "./Login";
import New from "./New";
import Show from "./Show";
import Submit from "./Submit";
import Threads from "./Threads";
import { urls } from "./Helpers";
import base from '../base';

class App extends React.Component {

  componentDidMount() {
    if(!sessionStorage.getItem("topPosts")) {
      this.pullPosts();
    } else {
      this.setState({ posts: JSON.parse(sessionStorage.getItem("topPosts")) });
    }
    
    this.postsRef = base.syncState("top/posts", {
      context: this,
      state: 'posts'
    });
  }

  componentDidUpdate() {
    sessionStorage.setItem('topPosts', JSON.stringify(this.state.posts));
  }

  componentWillUnmount() {
    base.removeBinding(this.postsRef);
  }

  pullPosts = async () => {
    let posts = { ...this.state.posts };
    posts = [];
    // Get 40 post ids for each category
    const response = await fetch(urls[5]);
    const data = await response.json();      
    let postIds = data.slice(0, 20);
    // Get 40 post details for each category
    for (let id of postIds) { 
      const resp2 = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
      const data2 = await resp2.json();
      posts.push(data2);
    };
    this.setState({ posts });
    console.log("done");
  }

  loading = () => {
    if(this.state.posts.length) return null;
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
          <Route exact path='/' component={Home} testing="test" />
          <Route exact path='/ask' component={Ask} />
          <Route exact path='/comments' component={Comments} />
          <Route exact path='/jobs' component={Jobs} />
          <Route exact path='/new' component={New} />
          <Route exact path='/show' component={Show} />
          <Route exact path='/submit' component={Submit} />
          <Route exact path='/threads' component={Threads} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
