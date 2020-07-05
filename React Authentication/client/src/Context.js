import React, { Component } from "react";
import Data from "./Data";

const Context = React.createContext();

/**
 * The Provider class in the file Context.js is a "higher-order component"
 *
 * @returns a Provider component which provides the application state and any actions or event handlers
 * that need to be shared between components, via a required value prop.
 */

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const value = {
      data: this.data,
    };

    console.log(value);

    return (
      //value represents an object containing the context to be shared throughout the component tree.
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async () => {};

  signOut = () => {};
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 *
 * withContext automatically subscribes (or connects) the component passed to it to all actions and context changes
 *
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
