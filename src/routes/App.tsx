import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Article, ArticleList, Editor, Login, Register, Logout, Profile, Settings } from "screens";
import Navbar from "../components/Navbar";
import Footer from "components/Footer";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={Register} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
