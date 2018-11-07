import React from "react";
// import { urls, fetchItems } from "./Helpers";

class Comments extends React.Component {
  componentDidMount() {
    // let commentIds = [...this.props.state.posts.comments];
    // let comments = [...this.props.state.posts.comments];
    
    // const pullLatest = async () => {
    //   const resp = await fetch(urls.maxItem);
    //   const data = await resp.json();
    //   await commentIds.push(data);

    //   let i = 0;
    //   while(commentIds.length < 20) {
    //     if (i === 20) return;
    //     let newId = commentIds[i] - 1;
    //     commentIds.push(newId);
    //     i++;
    //   }

    //   await fetchItems(commentIds, comments);
    //   this.props.updateComments(comments);
    // }
    // pullLatest();
  }

  render() {
    return (
      <div className="main">
        <p>this is the comments.js component.</p>
      </div>
    );
  }
}

export default Comments;
