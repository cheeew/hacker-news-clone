import React from "react";
import Header from "./Header";
import base from "../base";
import LoadButton from "./LoadButton";
import { urls } from "./Helpers";
import PostListing from "./PostListing";

class Ask extends React.Component {
  state = {
    posts: {

    }
  };

  componentDidMount() {
    if(!sessionStorage.getItem('askPosts')) {
      this.pullPosts();
    } else {
      this.setState({ posts: JSON.parse(sessionStorage.getItem("askPosts")) });
    }

    this.postsRef = base.syncState("ask/posts", {
      context: this,
      state: "posts"
    });
  }

  componentDidUpdate() {
    sessionStorage.setItem("askPosts", JSON.stringify(this.state.posts));
  }

  componentWillUnmount() {
    base.removeBinding(this.postsRef);
  }

  pullPosts = async () => {
    let posts = { ...this.state.posts };
    posts = [];
    // Get 40 post ids for each category
    const response = await fetch(urls[0]);
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
      <div className="wrapper">
        <Header company="News Clone"/>
        <div className="canvas">
          <LoadButton pullPosts={this.pullPosts}/>
          <ul className="post-wrapper">
            { this.loading() }
            {Object.entries(this.state.posts).map(post => (
              <PostListing key={post[1]["id"]} index={Number(post[0])} details={post[1]} state={this.state}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Ask;
