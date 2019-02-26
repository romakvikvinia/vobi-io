import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { AUTH_USER } from "../../package/apollo/query/Auth";

import isEmpty from "../../package/helper/isEmpty";
const PrivetRoute = ({ componetn: Component, ...rest }) => (
  <Query query={AUTH_USER}>
    {({ data, error, loading, client }) => {
      if (loading) return null;
      if (loading) return null;
      console.log(data);
      if (!data || isEmpty(data.auth)) {
        return <Redirect to="/signin" />;
      }
      return <Route {...rest} render={props => <Component {...props} />} />;
    }}
  </Query>
);

export default PrivetRoute;
