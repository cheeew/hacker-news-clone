import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Ask from "./Ask";
import Comments from "./Comments";
import Jobs from "./Jobs";
import Login from "./Login";
import New from "./New";
import Show from "./Show";
import Submit from "./Submit";
import Threads from "./Threads";

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/ask' component={Ask} />
      <Route exact path='/comments' component={Comments} />
      <Route exact path='/jobs' component={Jobs} />
      <Route exact path='/new' component={New} />
      <Route exact path='/show' component={Show} />
      <Route exact path='/submit' component={Submit} />
      <Route exact path='/threads' component={Threads} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </BrowserRouter>
);

export default router;
