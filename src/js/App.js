import React, { useEffect } from "react";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import { listenToAuthChanges } from "./actions/auth";
import { listenToConnectionChanges } from "./actions/app";
import { checkUserConnection } from "./actions/connection";
import { loadInitialSettings } from "./actions/settings";

import ChatView from "./views/Chat";
import HomeView from "./views/Home";
import ChatCreate from "./views/ChatCreate";
import SettingsView from "./views/Settings";
import WelcomeView from "./views/Welcome";

function AuthRoute({ children, ...rest }) {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default function App() {
  const ContentWrapper = ({ children }) => {
    const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
    return (
      <div className={`content-wrapper ${isDarkTheme ? "dark" : "light"}`}>
        {children}
      </div>
    );
  };

  function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);
    const isOnline = useSelector(({ app }) => app.isOnline);
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
      dispatch(loadInitialSettings());
      const unsubFromAuth = dispatch(listenToAuthChanges());

      const unsubFromConnection = dispatch(listenToConnectionChanges());

      return () => {
        unsubFromAuth();
        unsubFromConnection();
      };
    }, [dispatch]);

    useEffect(() => {
      let unsubFromUserConnection;
      if (user?.uid) {
        unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
      }

      return () => {
        unsubFromUserConnection && unsubFromUserConnection();
      };
    }, [dispatch, user]);

    if (!isOnline) {
      return (
        <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
      );
    }

    if (isChecking) {
      return <LoadingView />;
    }

    return (
      <Router>
        <ContentWrapper>
          <Switch>
            <Route path="/" exact>
              <WelcomeView />
            </Route>
            <AuthRoute path="/home">
              <HomeView />
            </AuthRoute>
            <AuthRoute path="/chatCreate">
              <ChatCreate />
            </AuthRoute>
            <AuthRoute path="/chat/:id">
              <ChatView />
            </AuthRoute>
            <AuthRoute path="/settings">
              <SettingsView />
            </AuthRoute>
          </Switch>
        </ContentWrapper>
      </Router>
    );
  }

  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}
