import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { AUTH_USER_CLIENT } from "../../package/apollo/query/Auth";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu() {
    let auth = this.props.client.readQuery({ query: AUTH_USER_CLIENT });
    let menu = (
      <React.Fragment>
        <Link className="nav-item nav-link " to="/signin">
          Sign in
        </Link>
        <Link className="nav-item nav-link " to="/signup">
          Sign up
        </Link>
      </React.Fragment>
    );

    if (auth.user.check) {
      menu = (
        <React.Fragment>
          <Link className="nav-item nav-link " to="/profile">
            Profile
          </Link>
          <Link className="nav-item nav-link " to="/invoice">
            Invoice
          </Link>
          <Link className="nav-item nav-link " to="/invoice/create">
            Create Invoice
          </Link>

          <Link className="nav-item nav-link " to="/logout">
            Logout
          </Link>
        </React.Fragment>
      );
    }
    return menu;
  }
  render() {
    return (
      <header className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand " to="/">
            Vobi
          </Link>

          {this.renderMenu()}
        </nav>
      </header>
    );
  }
}
export default withApollo(withRouter(Menu));
