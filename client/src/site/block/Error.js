import React from "react";
import ParseError from "../../package/helper/ParseError";

const Error = ({ message }) => {
  return <div className="alert alert-danger">{ParseError(message)}</div>;
};
export default Error;
