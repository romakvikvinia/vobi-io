import { gql } from "apollo-boost";

export const FRAGMENT_INVOICE = gql`
  fragment FullFields on InvoiceType {
    id
    name
    description
    contactName
    address
    date
    createdAt
    updatedAt
  }
`;
