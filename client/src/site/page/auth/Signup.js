import React from "react";
import { Mutation } from "react-apollo";
import { SIGN_UP } from "../../../package/apollo/mutations/Auth";
//helper
import ParseError from "../../../package/helper/ParseError";
//component block
import InputText from "../../block/InputText";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      message: ""
    };

    this.onChange = this.onChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e, singup) {
    e.preventDefault();
    singup().then(({ data }) => {
      this.setState({
        message: "Success",
        username: "",
        email: "",
        password: "",
        confirm: ""
      });
    });
  }
  validateForm() {
    return (
      !this.state.username ||
      !this.state.password ||
      !this.state.email ||
      this.state.password !== this.state.confirm
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 mx-auto">
          <h3 className="text-center mb-2">Sign Up</h3>
          <Mutation
            mutation={SIGN_UP}
            variables={{
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            }}
          >
            {(singup, { data, loading, error }) => {
              return (
                <form action="" onSubmit={e => this.onSubmit(e, singup)}>
                  {error && (
                    <div className="alert alert-danger">
                      {ParseError(error.message)}
                    </div>
                  )}

                  {this.state.message && (
                    <div className="alert alert-success">
                      {this.state.message}
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
                    type="email"
                    icon="fa fa-envelope"
                    name="email"
                    value={this.state.email}
                    placeholder="Email"
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

                  <InputText
                    type="password"
                    icon="fa fa-key"
                    name="confirm"
                    value={this.state.confirm}
                    placeholder="Confirm"
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
export default Signup;
