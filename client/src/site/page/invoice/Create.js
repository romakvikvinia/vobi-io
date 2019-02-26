import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { CREATE_INVOICE } from "../../../package/apollo/mutations/Invoice";
import { GET_INVOICES } from "../../../package/apollo/query/Invoice";
import isEmpty from "../../../package/helper/isEmpty";

//components
import Spinner from ".././../block/Spinner";
import Error from ".././../block/Error";
import Message from ".././../block/Message";
import InputText from "../../block/InputText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/style.css";
import CKEditor from "react-ckeditor-component";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      contactName: "",
      address: "",
      date: new Date()
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }
  updateCache(cache, { data }) {
    const { createInvoice } = data;
    const invoices = cache.readQuery({
      query: GET_INVOICES,
      variables: { pagination: localStorage.getItem("pagination") }
    });
    const { getInvoices } = invoices;

    cache.writeQuery({
      query: GET_INVOICES,
      variables: { pagination: localStorage.getItem("pagination") },
      data: {
        getInvoices: {
          page: localStorage.getItem("pagination"),
          total: getInvoices.total + 1,
          invoices: [createInvoice, ...getInvoices.invoices]
        }
      }
    });
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
      isEmpty(this.state.contactName) ||
      isEmpty(this.state.address) ||
      isEmpty(this.state.date)
    );
  }
  handleChange(date) {
    date = date.getTime();
    this.setState({ date });
  }
  onSubmit(e, createInvoice) {
    e.preventDefault();
    createInvoice().then(({ data }) => {
      this.setState({
        name: "",
        description: "",
        contactName: "",
        address: "",
        date: new Date()
      });
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_INVOICE}
        variables={{
          name: this.state.name,
          description: this.state.description,
          contactName: this.state.contactName,
          address: this.state.address,
          date: this.state.date.toString()
        }}
        update={this.updateCache}
      >
        {(createInvoice, { data, loading, error }) => {
          if (error) return <Error message={error.message} />;
          if (loading) return <Spinner />;

          return (
            <div className="row">
              <div className="col-md-10 mx-auto">
                <Link className="text-dark" to="/invoice">
                  Back
                </Link>
                <h3 className="text-dark mt-10 ">Create Invoice</h3>
                {data && <Message message="Invocie Created successfully" />}
                <form
                  className="d-block mt-2"
                  onSubmit={e => this.onSubmit(e, createInvoice)}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <InputText
                        icon="fa fa-file-o"
                        name="name"
                        value={this.state.name}
                        placeholder="name"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <InputText
                        icon="fa fa-map-marker"
                        name="address"
                        value={this.state.address}
                        placeholder="address"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <InputText
                        icon="fa fa-user"
                        name="contactName"
                        value={this.state.contactName}
                        placeholder="contactName"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mx-auto">
                      <DatePicker
                        className="form-control"
                        selected={new Date(this.state.date)}
                        onChange={this.handleChange}
                        dateFormatCalendar="MMMM YYYY"
                      />
                      <br />
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
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
