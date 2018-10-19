import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import New from "./New";
import Comments from "./Comments";
import Threads from "./Threads";
import Show from "./Show";
import Ask from "./Ask";
import Jobs from "./Jobs";
import Submit from "./Submit";
import Login from "./Login";
class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header company="News Clone"/>
        <div className="canvas">
          <Switch>
            <Route exact path='/new' component={New} />
            <Route exact path='/threads' component={Threads} />
            <Route exact path='/comments' component={Comments} />
            <Route exact path='/show' component={Show} />
            <Route exact path='/ask' component={Ask} />
            <Route exact path='/jobs' component={Jobs} />
            <Route exact path='/submit' component={Submit} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
