import { gql } from "apollo-boost";
import { FRAGMENT_INVOICE } from "../fragments/Invoice";

export const CREATE_INVOICE = gql`
  mutation(
    $name: String!
    $description: String
    $contactName: String
    $address: String
    $date: String
  ) {
    createInvoice(
      name: $name
      description: $description
      contactName: $contactName
      address: $address
      date: $date
    ) {
      ...FullFields
    }
  }
  ${FRAGMENT_INVOICE}
`;

export const EDIT_INVOICE = gql`
  mutation(
    $id: ID!
    $name: String!
    $description: String
    $contactName: String
    $address: String
    $date: String
  ) {
    editInvoice(
      id: $id
      name: $name
      description: $description
      contactName: $contactName
      address: $address
      date: $date
    ) {
      ...FullFields
    }
  }
  ${FRAGMENT_INVOICE}
`;

export const DELETE_MY_INVOICE_BY_ID = gql`
  mutation($id: ID!, $userID: ID) {
    deleteInvoice(id: $id, userID: $userID) {
      id
    }
  }
`;
