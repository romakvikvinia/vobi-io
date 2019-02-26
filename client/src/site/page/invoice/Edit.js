import React, { Component } from "react";
import { Mutation, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { EDIT_INVOICE } from ".././../../package/apollo/mutations/Invoice";
import {
  GET_INVOICE_BY_ID,
  GET_INVOICES
} from "../../../package/apollo/query/Invoice";
import isEmpty from "../../../package/helper/isEmpty";

//component
import Spinner from ".././../block/Spinner";
import Error from ".././../block/Error";
import InputText from "../../block/InputText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/style.css";
import CKEditor from "react-ckeditor-component";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      description: "",
      contactName: "",
      address: "",
      date: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }
  updateCache(cache, { data }) {
    // const { getInvoices } = cache.readQuery({ query: GET_INVOICES });
    cache.readQuery({
      query: GET_INVOICES,
      variables: { pagination: localStorage.getItem("pagination") }
    });
  }
  onSubmit(e, editInvoice) {
    e.preventDefault();
    editInvoice().then(({ data: { editInvoice } }) => {});
  }
  handleChange(date) {
    date = date.getTime();
    this.setState({ date });
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDescription(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent
    });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.client
      .query({
        query: GET_INVOICE_BY_ID,
        variables: {
          id
        }
      })
      .then(({ data, loading, error }) => {
        if (data.getInvoiceById) {
          this.setState({
            id,
            name: data.getInvoiceById.name,
            description: data.getInvoiceById.description,
            contactName: data.getInvoiceById.contactName,
            address: data.getInvoiceById.address,
            date: Number(data.getInvoiceById.date)
          });
        }
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 mx-auto">
          <Link className="text-dark" to="/">
            Back
          </Link>
          <Mutation
            mutation={EDIT_INVOICE}
            variables={{
              id: this.state.id,
              name: this.state.name,
              description: this.state.description,
              contactName: this.state.contactName,
              address: this.state.address,
              date: this.state.date.toString()
            }}
            update={this.updateCache}
          >
            {(editInvoice, { data, error, loading }) => {
              //   if (error) return <Error message={error} />;
              if (error) return <Error message={error.message} />;
              if (loading) return <Spinner />;
              return (
                <React.Fragment>
                  <h3 className="text-dark mt-10 ">{`Edit ${
                    this.state.name
                  }`}</h3>
                  <form
                    className="d-block mt-2"
                    onSubmit={e => this.onSubmit(e, editInvoice)}
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
                </React.Fragment>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default withApollo(Edit);
