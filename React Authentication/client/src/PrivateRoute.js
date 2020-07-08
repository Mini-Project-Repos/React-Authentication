import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

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
              <Redirect to="/signin" />
            )
          }
        />
      )}
    </Consumer>
  );
};
