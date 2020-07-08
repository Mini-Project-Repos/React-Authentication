import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Public from "./components/Public";
import NotFound from "./components/NotFound";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Authenticated from "./components/Authenticated";

import withContext from "./Context";

/**
 * The PrivateRoute component will serve as a high-order component for any routes that you want to protect and
 * make accessible to authenticated users only. The component will either allow the user to continue to the
 * specified private component, or redirect them to the sign in page if they are not logged in.
 */
import PrivateRoute from "./PrivateRoute";

/**
 * This connects the components to context.
 * In other words, the components are now a consuming component that's subscribed to all context changes.
 */
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Public} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
