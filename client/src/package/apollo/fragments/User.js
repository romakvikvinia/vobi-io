import { gql } from "apollo-boost";

export const FullUserFields = gql`
  fragment FullUserFields on UserType {
    id
    username
    email
    createdAt
    activated
    check
  }
`;
