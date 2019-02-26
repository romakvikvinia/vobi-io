import { gql } from "apollo-boost";

export const FULL_FRAGMENT_DETAIL = gql`
  fragment FullDetail on DetailType {
    id
    name
    description
    quantity
    price
    total
    invoiceID
  }
`;
