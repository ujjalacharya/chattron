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

import ChatView from "./views/Chat";
import HomeView from "./views/Home";
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
  const ContentWrapper = ({ children }) => (
    <div className="content-wrapper">{children}</div>
  );

  function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);

    const alertOnlineStatus = () => {
      window.alert(navigator.onLine ? "online" : "offline");
    };

    useEffect(() => {
      const unsubFromAuth = dispatch(listenToAuthChanges());

      window.addEventListener("online", alertOnlineStatus);
      window.addEventListener("offline", alertOnlineStatus);

      return () => {
        unsubFromAuth();
        window.removeEventListener("online", alertOnlineStatus);
        window.removeEventListener("offline", alertOnlineStatus);
      };
    }, [dispatch]);

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
