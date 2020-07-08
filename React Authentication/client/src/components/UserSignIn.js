import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
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
   *  The submit() function will log in an authenticated user upon submitting the "Sign In" form
   */
  submit = () => {
    const { context } = this.props;

    /**
     * The from variable passed to history.push(from) contains information about the pathname an unauthenticated
     * user redirected from (via this.props.location.state). For example, if a user redirects to the sign up page
     * from /settings, from will be equal to pathname: "/settings".
     */
    const { from } = this.props.location.state || {
      from: { pathname: "/authenticated" },
    };
    const { username, password } = this.state;
    /**
     * signIn() is an asynchronous operation that calls the getUser API method (written in Data.js)
     * and returns a promise. The resolved value of the promise is either an object holding the authenticated user's
     * name and username values (sent from the API if the response is 201),
     * or null (if the response is a 401 Unauthorized HTTP status code).
     */
    context.actions
      .signIn(username, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${username} is now signed in!`);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  /**
   * If a user decides to cancel sign-in, we will redirect them back to the home route upon clicking "Cancel".
   */

  cancel = () => {
    this.props.history.push("/");
  };
}
