import React, { Component } from "react";
import { FadeLoader } from "react-spinners";
class Spinner extends Component {
  render() {
    return (
      <div
        className="row"
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }}
      >
        <div className="col-md-2 mx-auto mt-10">
          <h3 className="text-center">
            <FadeLoader color={"#1eaedb"} size={30} margin={"10px"} />
          </h3>
        </div>
      </div>
    );
  }
}
export default Spinner;
