import { gql } from "apollo-boost";
import { FullUserFields } from "../fragments/User";

export const SIGN_IN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const AUTH_LOGIN_CLIENT = gql`
  mutation($username: String!, $email: String!, $check: Bool) {
    user(username: $username, email: $email, check: $check) @client {
      username
      email
      check
    }
  }
`;

export const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    singup(username: $username, email: $email, password: $password) {
      ...FullUserFields
    }
  }

  ${FullUserFields}
`;
