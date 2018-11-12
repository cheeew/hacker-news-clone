import React from "react";
import Submissions from "./Submissions";
import getPostAge, { fetchUser, fetchItems } from "./Helpers";

class User extends React.Component {
  
  async componentDidMount() {
    const { username } = this.props.match.params;
    let user = await fetchUser(username);
    user.showSubmissions = false;
    this.props.updateUser(user);

    const submitted = [];
    await fetchItems(this.props.user.submitted, submitted);
    user.submitted = submitted;
    this.props.updateUser(user);
  }

  componentWillUnmount() {
    let user = {};
    this.props.updateUser(user);
  }

  toggleSubs = () => {
    let user = {...this.props.user}
    user.showSubmissions = !user.showSubmissions;
    this.props.updateUser(user);
  }

  render() {
    const { created, id, karma, showSubmissions, submitted } = this.props.user;
    const stories = submitted 
    ? submitted.filter(sub => sub.type === "story" && !sub.deleted) 
    : null;

    return (
      <div className="main user">
        <p>{id ? `user: ${id}` : null}</p>
        <p>{created ? `created: ${getPostAge(created)}` : null}</p>
        <p>{karma ? `karma: ${karma}` : null}</p>
        {karma 
        ? <p>about: 
          <span className="subs"
          onClick ={() => this.toggleSubs()}>
            {typeof submitted[0] === 'number' 
            ? "submissions (loading...just one moment)" 
            : "submissions"}
          </span>
          </p> 
        : null}
        <ul className="post-wrapper">
          {showSubmissions === true 
          ? Object.entries(stories).map(post => ( 
            <Submissions
            key={post[1].id}
            user={this.props.user}
            post={post[1]} 
            index={post[0]} /> 
            ))
          : null}
        </ul>
      </div>
    );
  }
}

export default User;