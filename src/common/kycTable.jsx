import React, { Component } from "react";
import moment from "moment";
import { pushRoute } from "../AdminComponents/Services/pushRoute"

class KYCTable extends Component {
  state = {
    selectedKycId: "",
  };

  getFullCountryName = (countryCode) => {
    const countryMapping = {
      PHL: "PHILIPPINES",
      IND: "INDIA",
    };
    return countryMapping[countryCode] || countryCode;
  };

  getFullDocumentName = (documentCode) => {
    const documentMapping = {
      DL: "DRIVING LICENCE",
      UMP: "UNIFIED MULTI-PURPOSE ID",
    };
    return documentMapping[documentCode] || documentCode;
  };

  handleViewDetails = (kycId) => {
    const { navigate } = this.props;

    this.setState({ selectedKycId: kycId }, () => {
      navigate("/kycdetails", {
        state: {
          kycId: this.state.selectedKycId,
        },
      });
    });
  };

  render() {
    const { transactionHistory } = this.props;
    var sno = 1;

    const formatDateTime = (date) => {
      return moment(date).format("DD-MMM-YYYY hh:mm A");
    };

    const capitalize = (value) => {
      return value ? value.toUpperCase() : "";
    };

    const getStatusClassName = (status) => {
      return status === "FAILED"
        ? "text-danger"
        : status === "SUCCESS"
        ? "text-success"
        : "";
    };
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-head">
              <th scope="col">S NO</th>
              <th scope="col">Date</th>
              <th scope="col">KYC Id</th>
              <th scope="col">Country</th>
              <th scope="col">Document Type</th>
              <th scope="col">Reference No</th>
              <th scope="col">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {transactionHistory.map((hist) => (
              <tr key={hist.kycId}>
                <td>{sno++}</td>
                <td>{formatDateTime(hist.createdAt)}</td>

                <td>{capitalize(hist.kycId)}</td>
                <td>{this.getFullCountryName(hist.country)}</td>
                <td>
                  {this.getFullDocumentName(capitalize(hist.documentCode))}
                </td>
                <td>{hist.refNo || "-"}</td>
                <td className={getStatusClassName(capitalize(hist.kycStatus))}>
                  {capitalize(hist.kycStatus)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.handleViewDetails(hist.kycId)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default pushRoute(KYCTable);
