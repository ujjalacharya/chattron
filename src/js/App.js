import React from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ChatView from "./views/Chat";
import HomeView from "./views/Home";
import LoginView from "./views/Login";
import RegisterView from "./views/Register";
import SettingsView from "./views/Settings";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Switch>
          <Route path="/settings">
            <SettingsView />
          </Route>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <Route path="/chat">
            <ChatView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
