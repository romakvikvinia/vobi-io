import { gql } from "apollo-boost";
import { FRAGMENT_INVOICE } from "../fragments/Invoice";

export const GET_INVOICES = gql`
  query($pagination: String!, $searchText: String) {
    getInvoices(pagination: $pagination, searchText: $searchText) {
      page
      total
      invoices {
        ...FullFields
        user {
          username
        }
        detail {
          id
        }
      }
    }
  }
  ${FRAGMENT_INVOICE}
`;

export const GET_INVOICE_BY_ID = gql`
  query($id: ID!) {
    getInvoiceById(id: $id) {
      ...FullFields
    }
  }
  ${FRAGMENT_INVOICE}
`;
