import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { AUTH_LOGIN_CLIENT } from "../../package/apollo/mutations/Auth";
import { AUTH_USER } from "../../package/apollo/query/Auth";
//component
import PrivetRoute from "../inc/PrivetRoute";
import Menu from "../inc/menu";
import Signin from "../page/auth/Login";
import Logout from "../page/auth/Logout";
import Index from "../page/index";
import SignUp from "../page/auth/Signup";
import Profile from "../page/profile/Index";
import InvoiceIndex from "../page/invoice/Index";
import InvoiceEdit from "../page/invoice/Edit";
import InvoiceCreate from "../page/invoice/Create";
import CreateDetail from "../page/detail/Create";
import EditDetail from "../page/detail/Edit";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("_token")) {
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
                // this.props.history.push("/profile");
              });
          }
        });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="container-fluid">
          <React.Fragment>
            <Menu />
            <Route exact path="/" component={Index} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={SignUp} />

            <Switch>
              <PrivetRoute exact path="/profile" componetn={Profile} />
            </Switch>
            <Switch>
              <PrivetRoute exact path="/invoice" componetn={InvoiceIndex} />
            </Switch>
            <Switch>
              <PrivetRoute
                exact
                path="/invoice/create"
                componetn={InvoiceCreate}
              />
            </Switch>
            <Switch>
              <PrivetRoute
                exact
                path="/edit_invoice/:id"
                component={InvoiceEdit}
              />
            </Switch>
            <Switch>
              <PrivetRoute
                exact
                path="/create_detail/:id"
                component={CreateDetail}
              />
            </Switch>
            <Switch>
              <PrivetRoute
                exact
                path="/edit_detail/:id"
                component={EditDetail}
              />
            </Switch>

            <Switch>
              <PrivetRoute exact path="/logout" component={Logout} />
            </Switch>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default withApollo(withRouter(App));
