import React from "react";
import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { DELETE_MY_INVOICE_BY_ID } from "../../../../package/apollo/mutations/Invoice";
import { DELETE_INVOICE_DETAIL } from "../../../../package/apollo/mutations/Detail";
import { GET_INVOICES } from "../../../../package/apollo/query/Invoice";
import StripTags from "../../../../package/helper/StripTags";
import PropTypes from "prop-types";
import Moment from "react-moment";
Moment.globalFormat = "YYYY-MM-DD";
//helpers

const deleteInvoice = async (e, id, client) => {
  e.preventDefault();
  if (window.confirm("Are you sure")) {
    await client
      .mutate({
        mutation: DELETE_MY_INVOICE_BY_ID,
        variables: {
          id
        },
        refetchQueries: [
          {
            query: GET_INVOICES,
            variables: { pagination: localStorage.getItem("pagination") }
          }
        ]
      })
      .then(({ data }) => {});
  }
};

const deleteInvoiceDetail = async (e, id, client) => {
  e.preventDefault();
  if (window.confirm("Are you sure")) {
    await client
      .mutate({
        mutation: DELETE_INVOICE_DETAIL,
        variables: {
          id
        },
        refetchQueries: [
          {
            query: GET_INVOICES,
            variables: { pagination: localStorage.getItem("pagination") }
          }
        ]
      })
      .then(({ data }) => {});
  }
};

const Item = ({
  client,
  id,
  name,
  date,
  createdAt,
  updatedAt,
  description,
  contactName,
  address,
  user,
  username,
  detail
}) => {
  date = new Date(Number(date));
  createdAt = new Date(Number(createdAt));
  updatedAt = new Date(Number(updatedAt));
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>
        <Moment date={date} />
      </td>
      <td>
        <Moment date={createdAt} />
      </td>
      <td>
        <Moment date={updatedAt} />
      </td>
      <td>{StripTags(description)}</td>
      <td>{contactName}</td>
      <td>{address}</td>
      <td>
        {username === user.username && (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-cogs" />
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={`/edit_invoice/${id}`}>
                <i className="fa fa-pencil" /> Edit
              </Link>
              <Link
                to=""
                className="dropdown-item"
                onClick={e => deleteInvoice(e, id, client)}
              >
                <i className="fa fa-trash" /> Delete
              </Link>
              {detail === null && (
                <Link className="dropdown-item" to={`/create_detail/${id}`}>
                  <i className="fa fa-plus" /> Add Detail
                </Link>
              )}

              {detail !== null && (
                <Link className="dropdown-item" to={`/edit_detail/${id}`}>
                  <i className="fa fa-pencil" /> Edit Detail
                </Link>
              )}

              {detail !== null && (
                <Link
                  className="dropdown-item"
                  onClick={e => deleteInvoiceDetail(e, detail.id, client)}
                  to=""
                >
                  <i className="fa fa-trash" /> Del. Detail
                </Link>
              )}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
Item.propTypes = {
  name: PropTypes.string.isRequired
};
export default withApollo(Item);
