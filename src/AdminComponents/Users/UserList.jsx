import React, { Component } from "react";
import moment from "moment";
import { pushRoute } from "../Services/pushRoute";
import { toast } from "react-toastify";
import authService from "../Services/authService";
import get_Users from "../../Redux/action/getusersAction";
import { connect } from "react-redux";

class UsersList extends Component {
  state = {
    UsersList: [],
    searchInput: "",
    loadMore: false,
    page: 1,
    limit: 5,
  };

  componentDidMount = async () => {
    const { page, limit } = this.state;
      if (this.props?.getusers === null) {
        await get_Users("/admin/getUsers", page, limit);
        this.setState({
          UsersList: this.props?.getusers?.data || [],
          loadMore: this.props?.getusers?.loadMore,
        });
      }
      this.setState({
        UsersList: this.props?.getusers?.data || [],
        loadMore: this.props?.getusers?.loadMore,
      });
  };


  handleRefresh=async()=>{
    await get_Users("/admin/getUsers" ,1,5);
    this.setState({
      UsersList: this.props.getusers.data,
      loadMore: this.props.getusers.loadMore,
    });
  }


  handleSearchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  formatDateTime = (Date) => {
    return moment(Date).format("MMMM DD, YYYY hh:mm A");
  };

  handleLoadMore = async () => {
    try {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        async () => {
          const { page, limit } = this.state;
          await get_Users("/admin/getUsers", page, limit);
          this.setState({
            UsersList: this.props.getusers.data,
            loadMore: this.props.getusers.loadMore,
          });
        }
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    var sno = 1;
    const { navigate } = this.props;
    const { UsersList, searchInput, loadMore, page, limit } = this.state;

    const filteredUsersList = UsersList.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (!authService.IsAdmin()) {
      window.history.back();
    }

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">USERS LIST</h5>
                  <div className="d-flex">
                  
                    <div className="form-group mb-0 mr-2 position-relative">
                      <input
                        type="text"
                        style={{ width: "250px" }}
                        value={searchInput}
                        className="form-control"
                        placeholder="Search"
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

                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-3"
                      onClick={() => {
                        navigate("/adduser");
                      }}
                    >
                      Add User
                    </button>
                  </div>
                </div>
                {filteredUsersList.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">S NO</th>
                          <th scope="col">USER ID</th>
                          <th scope="col">NAME</th>
                          <th scope="col">EMAIL </th>
                          <th scope="col">Available Credits </th>
                          <th scope="col">Created At </th>
                          <th scope="col">Last updated At </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsersList.map((user) => (
                          <tr key={user._id}>
                            <td>{sno++}</td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.credits}</td>

                            <td>{this.formatDateTime(user.createdAt)}</td>
                            <td>{this.formatDateTime(user.updatedAt)}</td>
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
    getusers: state.getusers,
  };
};

export default connect(mapStateToProps)(pushRoute(UsersList));
