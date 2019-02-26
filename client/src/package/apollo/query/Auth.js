import { gql } from "apollo-boost";

export const AUTH_USER = gql`
  query {
    auth {
      username
      email
      check
    }
  }
`;

export const AUTH_USER_CLIENT = gql`
  query {
    user @client {
      username
      email
      check
    }
  }
`;

export const AUTH = gql`
  query {
    auth @client {
      username
      email
      check
    }
  }
`;
