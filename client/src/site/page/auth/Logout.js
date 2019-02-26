import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { AUTH_LOGIN_CLIENT } from "../../../package/apollo/mutations/Auth";

class Logout extends Component {
  componentDidMount() {
    this.props.client
      .mutate({
        mutation: AUTH_LOGIN_CLIENT,
        variables: {
          username: null,
          email: null,
          check: false
        }
      })
      .then(data => {
        typeof console.clear === "function" && console.clear();
        localStorage.removeItem("_token");
        localStorage.removeItem("pagination");
        this.props.history.push("/");
      });
  }
  render() {
    return <div />;
  }
}

export default withApollo(withRouter(Logout));
