import React from "react";
import { Mutation, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { EDIT_INVOICE_DETAIL } from "../../../package/apollo/mutations/Detail";
import { GET_INVOICES } from "../../../package/apollo/query/Invoice";
import { GET_INFOICE_DETAIL_BY_INVOICE_ID } from "../../../package/apollo/query/Detail";

//components
import Message from ".././../block/Message";
import CKEditor from "react-ckeditor-component";
import InputText from "../../block/InputText";
import isEmpty from "../../../package/helper/isEmpty";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      quantity: "",
      price: "",
      total: "",
      id: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }
  componentDidMount() {
    this.props.client
      .query({
        query: GET_INFOICE_DETAIL_BY_INVOICE_ID,
        variables: {
          id: this.props.match.params.id
        }
      })
      .then(({ data, loading, error }) => {
        if (!loading && !error && data) {
          const { getInvoiceDetailsByInvoiceId } = data;

          this.setState({
            id: getInvoiceDetailsByInvoiceId.id,
            name: getInvoiceDetailsByInvoiceId.name,
            description: getInvoiceDetailsByInvoiceId.description,
            price: getInvoiceDetailsByInvoiceId.price,
            quantity: getInvoiceDetailsByInvoiceId.quantity,
            total: getInvoiceDetailsByInvoiceId.total
          });
        }
      });
  }
  onSubmit(e, editInvoiceDetails) {
    e.preventDefault();

    editInvoiceDetails().then(({ data }) => {});
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeDescription(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent
    });
  }
  validateForm() {
    return (
      isEmpty(this.state.name) ||
      isEmpty(this.state.description) ||
      isEmpty(this.state.quantity) ||
      isEmpty(this.state.price) ||
      isEmpty(this.state.total)
    );
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-10 mx-auto">
          <Link className="text-dark" to="/invoice">
            Back
          </Link>
          <h3 className="text-dark mt-10 ">Edit Invoice Detail</h3>

          <Mutation
            mutation={EDIT_INVOICE_DETAIL}
            variables={{
              name: this.state.name,
              description: this.state.description,
              quantity: Number(this.state.quantity),
              price: Number(this.state.price),
              total: Number(this.state.total),
              id: this.state.id
            }}
            refetchQueries={[
              {
                query: GET_INVOICES,
                variables: {
                  pagination: localStorage.getItem("pagination")
                }
              }
            ]}
          >
            {(editInvoiceDetails, { data, loading, error }) => {
              return (
                <form onSubmit={e => this.onSubmit(e, editInvoiceDetails)}>
                  {data && (
                    <Message message="Invocie Detail Update successfully" />
                  )}
                  <div className="row">
                    <div className="col-md-3">
                      <InputText
                        icon="fa fa-file-o"
                        name="name"
                        value={this.state.name}
                        placeholder="name"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <InputText
                        icon="fa fa-money"
                        name="price"
                        value={this.state.price}
                        placeholder="Price"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <InputText
                        icon="fa fa-sort-numeric-asc"
                        name="quantity"
                        value={this.state.quantity}
                        placeholder="Quantity"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <InputText
                        icon="fa fa-sort-numeric-asc"
                        name="total"
                        value={this.state.total}
                        placeholder="Total"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <CKEditor
                        activeClass="p10"
                        content={this.state.description}
                        events={{
                          change: this.onChangeDescription
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col mt-2">
                      <button
                        disabled={this.validateForm()}
                        className="btn btn-success float-right"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default withApollo(Edit);
