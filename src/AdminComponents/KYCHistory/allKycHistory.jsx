import React, { Component } from "react";
import moment from "moment";
import { pushRoute } from "../Services/pushRoute";
import { connect } from "react-redux";
import GET_KYC_HISTORY from "../../Redux/action/GetKYCHistoryAction";
import { toast } from "react-toastify";
import KYCTable from "../../common/kycTable";
import { backEndCall, backEndCallObj } from "../Services/mainServiceFile";
import { Joi } from "joi-browser";

class AllKYCHistory extends Component {
  state = {
    allkyclist: [],
    searchInput: "",
    loadMore: false,
    page: 1,
    limit: 5,
    disabled:false,
    btnDisabled:false,
    startDateInput: "Select From Date",
    endDateInput:"Select To Date",
    errors:{},
  };
  

  // schema={

  //   startDate: Joi.date().allow("").label("From Date"),
  //   endDate: Joi.date().allow("").label("To Date"),
  // }

 

  componentDidMount = async () => {
      const { page, limit } = this.state;
        if (this.props?.getkychistory === null) {
          await GET_KYC_HISTORY("/member/getKyc", page, limit);
          this.setState({
            allkyclist: this.props?.getkychistory?.data || [],
            loadMore: this.props?.getkychistory?.loadMore,
          });
        }
        this.setState({
          allkyclist: this.props?.getkychistory?.data || [],
          loadMore: this.props?.getkychistory?.loadMore,
        }); 
  }

  handleRefresh=async()=>{
      await GET_KYC_HISTORY("/member/getKyc", 1, 5);
      this.setState({
      allkyclist: this.props?.getkychistory.data,
      loadMore: this.props?.getkychistory.loadMore,
      }); 
  }

  handleSearch=async()=>{
    this.setState({btnDisabled:true})
    const {searchInput} =this.state
    try{
      const allkyclist=await backEndCall(`/member/getKyc/${searchInput}`)
      this.setState({allkyclist:[allkyclist]})
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

  handleLoadMore = async () => {
    const { getkychistory } = this.props;
    try {
      this.setState({disabled:true})
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        async () => {
          const { page, limit } = this.state;
          await GET_KYC_HISTORY("/member/getKyc", page, limit);
          this.setState({
            allkyclist: this.props?.getkychistory.data,
            loadMore: this.props?.getkychistory.loadMore,
          });
        }
      );
      this.setState({disabled:false})

    } catch (ex) {
      this.setState({disabled:false})
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
    finally{
      this.setState({disabled:false})
    }
  };

  handleDateChange = (selectedDate, inputType) => {
    this.setState({
      [inputType]: selectedDate,
    });
  };

  render() {

    const { allkyclist, searchInput, loadMore,disabled,btnDisabled,startDateInput,
      endDateInput,} = this.state;
      console.log(startDateInput,endDateInput)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">TOTAL KYC HISTORY</h5>
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
                                   
                            
                    <div className="form-group mb-0 mr-2 position-relative">
               
                      <input
                        type="text"
                        style={{ width: "250px" }}
                        value={searchInput}
                        className="form-control mb-3"
                        placeholder="Search with  KYC Id"
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

                {allkyclist.length > 0 ? (
                  <>
                    <KYCTable transactionHistory={allkyclist} />
                    {loadMore && (
                      <div className="card-footer text-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={this.handleLoadMore}
                          disabled={disabled}
                        >
                          load more
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center mb-3">
                    There is no data to view
                  </div>
                )}
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

export default connect(mapStateToProps)(pushRoute(AllKYCHistory));
