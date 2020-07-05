import config from "./config";

/*
The Data class in this file holds the methods you will use to create, sign up and authenticate a user.
Data is effectively a helper class that provides utility methods to allow the React client to talk to the Express server.
*/

export default class Data {
  /**
   * The first method in the class, api(), is used to make the GET and POST requests to the REST API.
   * It currently accepts an API endpoint as its first argument (path), followed by the HTTP method, and body, which will contain any data associated with the request.
   */
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    /**
     * The url constant configures the request path using the base URL defined in config.js,
     * which gets passed to the returned fetch() method.
     */

    const url = config.apiBaseUrl + path;

    /**
     * The options object, for example, sends a request with the HTTP method,
     * as well as the request headers and a stringified body (if body is provided).
     */

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    /**
     * If we're making a request to a protected route on the server, authentication is required
     * (the requiresAuth is true). In that case, we'll encode the user credentials and set the HTTP Authorization
     * request header to the Basic Authentication type, followed by the encoded user credentials
     */
    if (requiresAuth) {
    }

    /**
     * fetch() accepts an optional second parameter:
     * a configuration object that lets you control a number of different settings you can apply to the request.
     *
     */
    return fetch(url, options);
  }

  /**
   * Makes a GET request to the /users endpoint, and returns a JSON object containing user credentials.
   */

  async getUser() {
    const response = await this.api(`/users`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * @param {user} user
   * Makes a POST request, sending new user data to the /users endpoint.
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
