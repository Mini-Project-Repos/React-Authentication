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

  state = {
    authenticatedUser: null,
  };

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      /*
      Provider's value prop an actions object to store any event handlers
      or actions you want to perform on data that's passed down through context.
      */
      actions: {
        signIn: this.signIn,
      },
    };

    console.log(value);

    return (
      //value represents an object containing the context to be shared throughout the component tree.
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /**
   * The signIn function is an asynchronous function that takes a username and password as arguments.
   * signIn uses those credentials to call the getUser() method in Data.js, which makes a GET request
   * to the protected /users route on the server and returns the user data.
   *
   * @param {*} username
   * @param {*} password
   *
   * @returns user
   */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
  };

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
