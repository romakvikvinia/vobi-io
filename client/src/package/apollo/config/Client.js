import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-boost";
import { ApolloLink } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { withClientState } from "apollo-link-state";
import defaults from "../defaults";
import resolvers from "../resolvers";

//Cache setup
const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id || null
});

//state link
const stateLink = new withClientState({
  cache,
  resolvers,
  defaults
});

//graphql Link
const httpLink = new HttpLink({
  // uri: "http://localhost:8080/graphql"
  uri: "https://vobi-io.herokuapp.com/graphql"
  // credentials: "include"
});

//eroror
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, path }) => {
        // console.log(`Error message ${message} path ${path}`);
      });
    }

    if (networkError) {
      localStorage.removeItem("_token");
      // console.log(`[network error ${networkError.message}]`);
    }
    if (response) {
      // console.log(graphQLErrors);
    }
  }
);

//auth link
const AuthLink = setContext((_, { headers, ...rest }) => {
  const context = {
    ...rest,
    headers: {
      ...headers,
      authorization: `${localStorage.getItem("_token")}` // seto token
    }
  };

  return context;
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, stateLink, AuthLink, httpLink])
});
export default client;
