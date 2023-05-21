import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "../screens/Article";
import ArticleList from "../screens/ArticleList";
import Editor from "../screens/Editor";
import LoginRegister from "../screens/LoginRegister";
import Logout from "../screens/Logout";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginRegister} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={LoginRegister} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
