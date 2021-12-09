import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Editor from "./components/Editor";
import "./assests/css/styles.css";

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/editor">
        <Editor />
      </Route>
    </Switch>
  </div>
);

export default App;
