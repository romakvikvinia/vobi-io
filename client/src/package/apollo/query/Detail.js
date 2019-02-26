import { gql } from "apollo-boost";
import { FULL_FRAGMENT_DETAIL } from "../fragments/InvoiceDetail";

export const GET_INFOICE_DETAIL_BY_INVOICE_ID = gql`
  query($id: ID!) {
    getInvoiceDetailsByInvoiceId(id: $id) {
      ...FullDetail
    }
  }
  ${FULL_FRAGMENT_DETAIL}
`;
