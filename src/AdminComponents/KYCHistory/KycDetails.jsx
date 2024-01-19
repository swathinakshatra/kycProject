import React, { Component } from "react";
import GET_KYC_HISTORY from "../../Redux/action/GetKYCHistoryAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { pushRoute } from "../Services/pushRoute";

class KycDetails extends Component {
  state = {
    KycList: [],
    page: 1,
    limit: 5,
    kycId: 0,
    country: "",
    date: "",
    selectedKycID: this.props?.location?.state?.kycId || "",
  };

  formatDateTime = (Date) => {
    return moment(Date).format("MMMM DD, YYYY hh:mm A");
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

  capitalize = (value) => {
    return value ? value.toUpperCase() : "";
  };

  componentDidMount = async () => {
    const { page, limit } = this.state;
    try {
      if (this.props?.getkychistory === null) {
        await GET_KYC_HISTORY("/member/getKyc", page, limit);
        this.setState({
          KycList: this.props?.getkychistory.data,
        });
      }
      this.setState({
        KycList: this.props?.getkychistory.data || [],
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    const { navigate } = this.props;

    const { KycList, selectedKycID } = this.state;
    const selectedKycDetails = KycList.find(
      (kyc) => kyc.kycId === selectedKycID
    );

    if (!selectedKycDetails) {
      const { navigate } = this.props;
      navigate("/allkychistory");
      return <div>No KYC details found for the selected ID.</div>;
    }
    return (
      <div className="container-fluid">
        <div className="card">
          <span onClick={() => navigate("/allkychistory")}>
            <i
              className=" fas fa-light fa-arrow-left kyc-details-back"
              style={{ cursor: "pointer" }}
            ></i>
          </span>
          <div className="card-body">
            <label className="form-label tx-primary">KYC Details</label>

              {selectedKycDetails.faceMatchStatus === "failed" && (
                <div class="alert alert-danger px-3 py-2" role="alert">
                <p className="mb-0">
                  Face didn't matched with the given document
                </p>
                </div>
              )}
              {selectedKycDetails.ocrStatus === "failed" && (
                <div class="alert alert-danger px-3 py-2" role="alert">
                <p className="mb-0 mt-1">
                  Invalid document or document is not clear
                </p>
                </div>
              )}

            <div className="row">
              <div className="col-md-5 col-12">
                <div className="form-group">
                  <label className="form-label tx-primary">KYC ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.kycId)}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.getFullCountryName(
                      this.capitalize(selectedKycDetails.country)
                    )}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">Created at</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.formatDateTime(selectedKycDetails.createdAt)}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">Document type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.getFullDocumentName(
                      this.capitalize(selectedKycDetails.documentCode)
                    )}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">Face Match</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.faceMatch)}
                    readOnly
                  />
                </div>
                {/* <div className="form-group">
                  <label className="form-label tx-primary">User Id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedKycDetails.userId}
                    readOnly
                  />
                </div> */}
              </div>
              <div className="col-md-5 col-12">
                <div className="form-group">
                  <label className="form-label tx-primary">
                    Face Match Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.faceMatchStatus)}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">KYC status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.kycStatus)}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">OCR status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.ocrStatus)}
                    readOnly
                  />
                </div>
                {/* <div className="form-group">
                  <label className="form-label tx-primary">OCR text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      selectedKycDetails.ocrText !== "0"
                        ? selectedKycDetails.ocrText
                        : "" + selectedKycDetails.ocrTextBack !== "0"
                        ? selectedKycDetails.ocrTextBack
                        : ""
                    }
                    readOnly
                  />
                </div> */}
                <div className="form-group">
                  <label className="form-label tx-primary">
                    Reference number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedKycDetails.refNo}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label tx-primary">user id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.capitalize(selectedKycDetails.userId)}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Uploaded documents</label>
                  <div className="d-flex flex-wrap gap-2">
                    <img
                      alt="doc-1"
                      src={selectedKycDetails.document}
                      className="reviewPhotos"
                    />
                    {selectedKycDetails.documentBack && (
                      <img
                        alt="doc-2"
                        src={selectedKycDetails.documentBack}
                        className="reviewPhotos"
                      />
                    )}
                    <img
                      src={selectedKycDetails.selfie}
                      className="reviewPhotos"
                      alt="selfie"
                    />
                  </div>
                </div>
                <div className="row">
                  {Object.keys(selectedKycDetails.ocr).map(
                    (field) =>
                      selectedKycDetails.ocr[field] && (
                        <div className="col-md-6" key={field}>
                          <div className="form-group">
                            <label className="form-label">{field}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedKycDetails.ocr[field]}
                              readOnly
                            />
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getkychistory: state.getkychistory,
  };
};

export default connect(mapStateToProps)(pushRoute(KycDetails));
