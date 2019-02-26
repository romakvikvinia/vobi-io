import React from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { CREATE_INVOCE_DETAIL } from "../../../package/apollo/mutations/Detail";
import { GET_INVOICES } from "../../../package/apollo/query/Invoice";

//components
import Message from ".././../block/Message";
import CKEditor from "react-ckeditor-component";
import InputText from "../../block/InputText";
import isEmpty from "../../../package/helper/isEmpty";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      quantity: "",
      price: "",
      total: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  onSubmit(e, createInvoiceDetails) {
    e.preventDefault();

    createInvoiceDetails().then(({ data }) => {});
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
          <h3 className="text-dark mt-10 ">Create Invoice Detail</h3>

          <Mutation
            mutation={CREATE_INVOCE_DETAIL}
            variables={{
              name: this.state.name,
              description: this.state.description,
              quantity: Number(this.state.quantity),
              price: Number(this.state.price),
              total: Number(this.state.total),
              invoiceID: this.props.match.params.id
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
            {(createInvoiceDetails, { data, loading, error }) => {
              return (
                <form onSubmit={e => this.onSubmit(e, createInvoiceDetails)}>
                  {data && (
                    <Message message="Invocie Detail Created successfully" />
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

export default Create;
