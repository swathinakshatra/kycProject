import React, { Component } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import GET_CREDITS_HISTORY from "../../Redux/action/GetCreditsHistoryaAction";
import { connect } from "react-redux";
import { backEndCall } from "../Services/mainServiceFile";

class AllCreditsHistory extends Component {
  state = {
    allcreditslist: [],
    searchInput: "",
    loadMore: false,
    page: 1,
    limit: 5,
    btnDisabled:false,
    startDateInput: "text",
    endDateInput:"text",
    errors:{},
    startDate:"",
    endDate:"",
  };

  componentDidMount = async () => {
    const { page, limit } = this.state;
    if (this.props?.getcreditshistory === null) {
        await GET_CREDITS_HISTORY("/member/creditshistory", page, limit);
        this.setState({
          allcreditslist: this.props?.getcreditshistory?.data,
          loadMore: this.props?.getcreditshistory?.loadMore,
        });
      }
      this.setState({
        allcreditslist: this.props?.getcreditshistory?.data || [],
        loadMore: this.props?.getcreditshistory?.loadMore,
      });
  };

  handleLoadMore = async () => {
    try {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        async () => {
          const { page, limit } = this.state;
          await GET_CREDITS_HISTORY("/member/creditshistory", page, limit);

          this.setState({
            allcreditslist: this.props?.getcreditshistory.data,
            loadMore: this.props?.getcreditshistory.loadMore,
          });
        }
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };


  handleDateChange = (selectedDate, inputType) => {
    this.setState({
      [inputType]: selectedDate,
    });
  };
  
  handleSearch=async()=>{
    this.setState({btnDisabled:true})
    const {searchInput} =this.state
    try{
      const allcreditslist=await backEndCall(`/member/creditsHistory/${searchInput}`)
      this.setState({allcreditslist:[allcreditslist]})
    }
    catch(ex){
    }
    finally{
      this.setState({btnDisabled:false})
    }
  }   

  handleSearchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  formatDateTime = (Date) => {
    return moment(Date).format("MMMM DD, YYYY hh:mm A");
  };


  capitalize = (value) => {
    return value ? value.toUpperCase() : "";
  };

  handleRefresh=async()=>{
      await GET_CREDITS_HISTORY("/member/creditshistory", 1, 5);
      this.setState({
        allcreditslist: this.props?.getcreditshistory?.data,
        loadMore: this.props?.getcreditshistory?.loadMore,
      });
  }

  render() {
    var sno = 1;
    const { allcreditslist, searchInput, loadMore, btnDisabled,startDateInput,endDateInput} = this.state;
    

    const getStatusClassName = (status) => {
      return status === "FAILED"
        ? "text-danger"
        : status === "SUCCESS"
        ? "text-success"
        : "";
    };
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">TOTAL CREDITS HISTORY</h5>
                  <div className="form-group mb-0">
                          <div className="flex-grow-1 position-relative">
                                <input
                                    type={this.state.startDateInput}
                                    value={startDateInput}
                                    placeholder=""
                                    name="startDate"
                                    id="startDate"
                                    className="form-control"
                                    onChange={(e) =>
                                      this.handleDateChange(e.target.value, "startDateInput")

                                    }
                                    onFocus={() =>
                                      this.setState({ startDateInput: "date" })
                                    }
                                  />
                                  {this.state.errors && (
                                    <p className="mb-0 text-danger cg_tx-12 cg_form-error">
                                      {this.state.errors.startDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group mb-0">
                                <div className="flex-grow-1 position-relative">
                                
                                  <input
                                    type={this.state.endDateInput}
                                    value={endDateInput}
                                    placeholder=""
                                    name="endDate"
                                    id="endDate"
                                    className="form-control"
                                    onChange={(e) =>
                                      this.handleDateChange(e.target.value, "endDateInput")

                                    }
                                    onFocus={() =>
                                      this.setState({ endDateInput: "date" })
                                    }
                                  />
                                  {this.state.errors && (
                                    <p className="mb-0 text-danger cg_tx-12 cg_form-error">
                                      {this.state.errors.endDate}
                                    </p>
                                  )}
                                </div>
                              </div> 
                              <div className="text-center mt-1">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={this.handleSearch}
                          disabled={btnDisabled}
                        >
                        Filter with date
                        </button>
                      </div> 
                  <div className="d-flex">

                  {/* <div className="pt-2 px-2" onClick={this.handleRefresh}>
                    <i className="fa fa-rotate-right cursor"></i>

                    </div> */}
                    <div className="form-group mb-0 mr-2 position-relative">
                      <input
                        type="text"
                        style={{ width: "250px" }}
                        value={searchInput}
                        className="form-control mb-3"
                        placeholder="Search with Transaction Id"
                        onChange={this.handleSearchInputChange}
                      />
                      {searchInput && (
                        <span
                          className="clearicon"
                          onClick={() => this.setState({ searchInput: "" })}
                        >
                          <i className="fa fa-times"></i>
                        </span>
                      )}
                    </div>
                    <div className="text-center mt-1">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={this.handleSearch}
                          disabled={btnDisabled}
                        >
                          Search 
                        </button>
                      </div>
                  </div>
                </div>
                {allcreditslist.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="table-head">
                        <tr>
                          <th scope="col">S NO</th>
                          <th scope="col">Date </th>

                          <th scope="col">USER Id</th>
                          <th scope="col">KYC Id</th>
                          <th scope="col">Transaction Id </th>
                          <th scope="col">Credits </th>
                          <th scope="col">Status </th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {allcreditslist.map((hist) => (
                          <tr key={hist.kycId}>
                            <td>{sno++}</td>
                            <td>{this.formatDateTime(hist.createdAt)}</td>
                            <td className="">{hist.userId}</td>
                            <td>{this.capitalize(hist.kycId)}</td>
                            <td>{this.capitalize(hist.tid)}</td>
                            <td>{this.capitalize(hist.credits)}</td>
                            <td
                              className={getStatusClassName(this.capitalize(
                                (hist.status)
                              )
                              )}
                            >
                              {this.capitalize(hist.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center mb-3">
                    There is no data to view
                  </div>
                )}
              </div>

              {loadMore && (
                <div className="card-footer text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.handleLoadMore}
                  >
                    load more
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcreditshistory: state.getcreditshistory,
  };
};

export default connect(mapStateToProps)(AllCreditsHistory);
