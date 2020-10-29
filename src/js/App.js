import React from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";

import configureStore from "./store";

import Navbar from "./components/Navbar";
import ChatView from "./views/Chat";
import HomeView from "./views/Home";
import SettingsView from "./views/Settings";
import WelcomeView from "./views/Welcome";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
            <Route path="/" exact>
              <WelcomeView />
            </Route>
            <Route path="/home">
              <HomeView />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
