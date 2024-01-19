import React, { Component } from "react";
import { pushRoute } from "../Services/pushRoute";
import moment from "moment";
import GET_KYC_HISTORY from "../../Redux/action/GetKYCHistoryAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import KYCTable from "../../common/kycTable";

class TransactionHistory extends Component {
  state = {
    transactionHistory: [],
    page: 1,
    limit: 5,
  };

  componentDidMount = async () => {
    const { page, limit } = this.state;
    try {
      if (this.props?.getkychistory === null) {
        await GET_KYC_HISTORY("/member/getKyc", page, limit);
        this.setState({
          transactionHistory: this.props?.getkychistory.data.slice(0, 5),
        });
      }
      this.setState({
        transactionHistory: this.props?.getkychistory.data.slice(0, 5) || [],
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  formatDateTime = (Date) => {
    return moment(Date).format("MMMM DD, YYYY hh:mm A");
  };

  render() {
    var sno = 1;
    const { navigate } = this.props;

    const { transactionHistory } = this.state;

    return (
      <div className="card">
        <div className="card-header">KYC History</div>

        {transactionHistory.length > 0 ? (
          <>
            <div className="card-body">
              <KYCTable transactionHistory={transactionHistory} />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="show-btn mb-2 mt-2"
                onClick={() => {
                  navigate("/allkychistory");
                }}
              >
                Show all
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mb-3">There is no data to view</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getkychistory: state.getkychistory,
  };
};

export default connect(mapStateToProps)(pushRoute(TransactionHistory));
