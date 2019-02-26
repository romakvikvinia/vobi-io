import { gql } from "apollo-boost";
import { FULL_FRAGMENT_DETAIL } from "../fragments/InvoiceDetail";

export const CREATE_INVOCE_DETAIL = gql`
  mutation(
    $name: String
    $description: String
    $quantity: Int!
    $price: Float!
    $total: Int!
    $invoiceID: ID!
  ) {
    createInvoiceDetails(
      name: $name
      description: $description
      quantity: $quantity
      price: $price
      total: $total
      invoiceID: $invoiceID
    ) {
      ...FullDetail
    }
  }

  ${FULL_FRAGMENT_DETAIL}
`;

export const EDIT_INVOICE_DETAIL = gql`
  mutation(
    $id: ID!
    $name: String
    $description: String
    $quantity: Int!
    $price: Float!
    $total: Int!
  ) {
    editInvoiceDetails(
      id: $id
      name: $name
      description: $description
      quantity: $quantity
      price: $price
      total: $total
    ) {
      ...FullDetail
    }
  }
  ${FULL_FRAGMENT_DETAIL}
`;

export const DELETE_INVOICE_DETAIL = gql`
  mutation($id: ID!) {
    deleteInvoiceDetails(id: $id) {
      id
    }
  }
`;
