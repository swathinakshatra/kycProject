import React, { Component } from "react";
import { pushRoute } from "../Services/pushRoute";
import authService from "../Services/authService";
import CreditsCard from "./creditscards";
import TransactionHistory from "./Transactionhistory";

class DashBoard extends Component {
  state = {};

  

  render() {
    return (
      <div className="container-fluid">
        <CreditsCard />

        <TransactionHistory />

      </div>
    );
  }
}

export default pushRoute(DashBoard);
