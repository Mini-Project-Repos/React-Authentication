import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    errors: [],
  };

  render() {
    const { name, username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              // render prop
              <React.Fragment>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.change}
                  placeholder="Name"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  /**
   * creates a new user and sends their credentials to the Express server.
   * A new user will be created using the state initialized in the UserSignUp class and the createUser() method
   * defined in Data.js.
   */
  submit = () => {
    // Destructure props and state
    const { context } = this.props;

    const { name, username, password } = this.state;

    // New user payload
    const user = {
      name,
      username,
      password,
    };

    /*
    The createUser function is passed in via context instead of prop drilling 
    createUser() is an asynchronous operation that returns a promise.
    The resolved value of the promise is either an array of errors (sent from the API if the response is 400),
    or an empty array (if the response is 201).
    */

    context.data
      .createUser(user)
      .then(
        //Get the value out of the returned promise
        (errors) => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            console.log(
              `${username} is successfully signed up and authenticated!`
            );
          }
        }
      )
      .catch((err) => {
        //handle rejected promises
        console.log(err);

        /**
         * a component rendered by <Route> gets passed a history object (via props) that listens for changes
         * to the current URL, keeps track of browser history and the number of entries in the history stack.
         * The history object can also be used to programmatically change the current URL.
         */

        this.props.history.push("/error"); // push to history stack
      });
  };

  /**
   * If a user decides to cancel registration, we will redirect them back to the home route upon clicking "Cancel".
   * In the body of the cancel function push the root path ('/') onto the history stack:
   */
  cancel = () => {
    this.props.history.push("/");
  };
}
