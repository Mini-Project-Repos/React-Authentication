import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

/**
 * The PrivateRoute component will serve as a high-order component for any routes that you want to protect and
 * make accessible to authenticated users only. The component will either allow the user to continue to the
 * specified private component, or redirect them to the sign in page if they are not logged in.
 */

/**
 * The function first destructures and renames the component prop in its parameters.
 * It also collects any props that get passed to it in a ...rest variable:
 */
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  /**
                  Redirects the user back to the page they were trying to get to after they log in

                  The state property holds information about the user's current location (i.e., the current browser URL).
                  That way, if authentication is successful, the router can redirect the user back to the original location 
                  (from: props.location)

                  Since pathname: '/signin' renders the UserSignIn component on redirect,
                  you can access from via this.props.location.state.from within the UserSignIn component.

                   */
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
