import React, { Component } from "react";
import { Mutation, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import ParseError from "../../../package/helper/ParseError";

import {
  SIGN_IN_MUTATION,
  AUTH_LOGIN_CLIENT
} from "../../../package/apollo/mutations/Auth";
import { AUTH_USER } from "../../../package/apollo/query/Auth";
//component
import InputText from "../../block/InputText";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  validateForm() {
    return !this.state.username || !this.state.password;
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e, login) {
    e.preventDefault();
    login().then(({ data: { login } }) => {
      localStorage.setItem("_token", login.token);

      this.props.client
        .query({ query: AUTH_USER })
        .then(({ data, error, loading }) => {
          if (data.auth) {
            this.props.client
              .mutate({
                mutation: AUTH_LOGIN_CLIENT,
                variables: {
                  username: data.auth.username,
                  email: data.auth.email,
                  check: true
                }
              })
              .then(data => {
                this.props.history.push("/profile");
              });
          }
        });
    });
  }

  updateCache(cache, { data }) {}

  render() {
    return (
      <div className="row">
        <div className="col-md-3 mx-auto">
          <h3 className="text-center mb-2">Sign In</h3>
          <Mutation
            mutation={SIGN_IN_MUTATION}
            variables={{
              username: this.state.username,
              password: this.state.password
            }}
            // refetchQueries={() => ({ query: AUTH_USER })}
          >
            {(login, { data, error, loading, client }) => {
              return (
                <form onSubmit={e => this.onSubmit(e, login)}>
                  {error && (
                    <div className="alert alert-danger">
                      {ParseError(error.message)}
                    </div>
                  )}
                  <InputText
                    icon="fa fa-user"
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.onChange}
                  />
                  <InputText
                    type="password"
                    icon="fa fa-key"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.onChange}
                  />

                  <button
                    className="btn btn-success float-right"
                    type="submit"
                    disabled={loading || this.validateForm()}
                  >
                    Sign in
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default withApollo(withRouter(Login));
