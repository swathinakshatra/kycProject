import React, { Component } from "react";
import { backEndCall } from "../Services/mainServiceFile";
import authService from "../Services/authService";
import GET_KYCSTATS from "../../Redux/action/GetKycStatsAction";
import { connect } from "react-redux";

import { toast } from "react-toastify";
class CreditsCard extends Component {
  state = {
    kycSuccessToday: 0,
    kycToday: 0,
    credits: 0,
    kycSuccess: 0,
    stats: [],
  };

  componentDidMount = async () => {
    if (this.props?.getkycstats === null) {
      await GET_KYCSTATS("/member/kycStats");
      this.setState({
        kycSuccess: this.props.getkycstats?.stats?.kycSuccess,
        credits: this.props.getkycstats?.stats?.credits,
        kycSuccessToday: this.props.getkycstats?.stats?.kycSuccessToday,
      });
    }
    this.setState({
      kycSuccess: this.props.getkycstats?.stats?.kycSuccess,
      credits: this.props.getkycstats?.stats?.credits,
      kycSuccessToday: this.props.getkycstats?.stats?.kycSuccessToday,
    });
  };

  render() {
    const { kycSuccess, kycSuccessToday, credits } = this.state;
    return (
      <div className=" mt-3">
        <div className="card-content  mb-3">
          <div className="row row-group m-0 card-items">
            <div className=" border-light card-item">
              <div className="card-body">
                <h5 className=" mb-0 credits-head">
                  {credits}
                  <span className="float-right">
                    <i className="fa fa-dollar tx-secondary"></i>
                  </span>
                </h5>
                <hr />
                <p className="mb-0  small-font">Total Credits</p>
              </div>
            </div>
            <div className="border-light card-item">
              <div className="card-body">
                <h5 className=" mb-0 credits-head">
                  {kycSuccess}
                  <span className="float-right">
                    <i className="fa fa-file tx-primary"></i>
                  </span>
                </h5>
                <hr />
                <p className="mb-0  small-font">Total Successful KYC’s</p>
              </div>
            </div>

            <div className=" border-light card-item">
              <div className="card-body">
                <h5 className=" mb-0 credits-head">
                  {kycSuccessToday}
                  <span className="float-right">
                    <i className="fa fa-check tx-green"></i>
                  </span>
                </h5>
                <hr />
                <p className="mb-0  small-font">Today's Successful KYC</p>
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
    getkycstats: state.getkycstats,
  };
};
export default connect(mapStateToProps)(CreditsCard);
