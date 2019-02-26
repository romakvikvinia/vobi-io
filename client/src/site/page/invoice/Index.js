import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { Query } from "react-apollo";
import { GET_INVOICES } from "../../../package/apollo/query/Invoice";
import { AUTH } from "../../../package/apollo/query/Auth";

//componnet
import Item from "./block/Item";
import Sponner from "../../block/Spinner";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: "1",
      searchText: "",
      limit: 2,
      nextPage: false,
      prevPage: true
    };
    this.NextPage = this.NextPage.bind(this);
    this.PrevPage = this.PrevPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.refetch = this.refetch.bind(this);
  }
  async refetch() {
    const { data } = await this.props.client.query({
      query: GET_INVOICES,
      variables: {
        pagination: this.state.pagination,
        searchText: this.state.searchText
      },
      fetchPolicy: "network-only"
    });

    this.props.client.cache.writeQuery({
      query: GET_INVOICES,
      variables: {
        pagination: this.state.pagination
      },
      data: {
        getInvoices: data.getInvoices
      }
    });
  }
  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    this.refetch();
  }

  componentDidMount() {
    // it's use when update invoice
    // and want update cache from response
    // in clien side
    localStorage.setItem("pagination", this.state.pagination);

    this.props.client.query({ query: AUTH }).then(({ data }) => {
      this.setState({ username: data.auth.username });
    });
  }
  NextPage({ page, total }) {
    let { pagination } = this.state;
    let pages = total / this.state.limit;
    if (pagination === pages - 1) {
      this.setState({ nextPage: true });
    } else {
      this.setState({ nextPage: false });
    }
    pagination = Number(pagination) + 1;
    if (pagination <= pages) {
      pagination = pagination.toString();
      this.setState({ pagination });
      this.setState({ prevPage: false });
      localStorage.setItem("pagination", pagination);
    }
  }
  PrevPage({ page, total }) {
    let { pagination } = this.state;
    let pages = total / this.state.limit;
    if (pages - pagination === 1) {
      this.setState({ prevPage: true });
    } else {
      this.setState({ prevPage: false });
    }
    pagination = Number(pagination) - 1;

    if (pagination && pagination <= pages) {
      pagination = pagination.toString();
      this.setState({ pagination });
      this.setState({ nextPage: false });
      localStorage.setItem("pagination", pagination);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 mx-auto" style={{ minHeight: "300px" }}>
          <Query
            query={GET_INVOICES}
            variables={{
              pagination: this.state.pagination
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <Sponner />;
              if (error) return null;
              return (
                <React.Fragment>
                  <div className="row">
                    <br />

                    <div className="col-md-4 ml-auto search_input_invoice float-rigth">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-file" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="searchText"
                          value={this.state.searchText}
                          placeholder="Search Invoice"
                          onChange={e => this.onChange(e)}
                        />

                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="basic-addon1"
                            style={{ padding: 0 }}
                          >
                            <button
                              type="button"
                              className="btn btn-sm "
                              onClick={e => this.refetch()}
                            >
                              <i className="fa fa-search" />
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Sponner /> */}
                  <table className="table mt-2">
                    <thead>
                      <tr>
                        <th scope="col">name</th>
                        <th scope="col">date</th>
                        <th scope="col">created</th>
                        <th scope="col">modified</th>
                        <th scope="col">description</th>
                        <th scope="col">contactName</th>
                        <th scope="col">address</th>
                        <th scope="col">
                          <i className="fa fa-cogs" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.getInvoices.invoices.map(item => (
                        <Item
                          {...item}
                          key={item.id}
                          username={this.state.username}
                        />
                      ))}
                    </tbody>
                  </table>

                  <ul className="pagination float-right">
                    <li className="page-item">
                      <button
                        type="button"
                        className="page-link"
                        onClick={e => this.PrevPage(data.getInvoices)}
                      >
                        <i className="fa fa-arrow-left" />
                      </button>
                    </li>

                    <li className="page-item">
                      <i className="page-link">{this.state.pagination} </i>
                    </li>

                    <li className="page-item">
                      <button
                        type="button"
                        className="page-link"
                        disabled={this.state.nextPage}
                        onClick={e => this.NextPage(data.getInvoices)}
                      >
                        <i className="fa fa-arrow-right" />
                      </button>
                    </li>
                  </ul>
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default withApollo(Index);
