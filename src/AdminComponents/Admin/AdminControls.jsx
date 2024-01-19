import React, { Component } from "react";
import { backEndCallObj } from "../Services/mainServiceFile";
import { pushRoute } from "../Services/pushRoute";
import { toast } from "react-toastify";
import authService from "../Services/authService";
import get_AdminControls from "../../Redux/action/GetAdminControlsAction";
import { connect } from "react-redux";

class AdminControls extends Component {
  state = {
    adminControlsList: [],
  };

  componentDidMount = async () => {
    const {  getadmincontrols } = this.props;
    const email = authService.getCurrentUser()?.email || "";
    if (getadmincontrols===null) {
      await get_AdminControls("/admin/getControls", email);
      this.setAdminControlsList();
    } else {
      this.setAdminControlsList();
    }
  };

  setAdminControlsList = () => {
    const adminControlsList = ["login", "register", "kyc"].map((key) => ({
      value: this.props?.getadmincontrols?.[key],
      key,
      heading: key.toUpperCase(),
    }));

    this.setState({ adminControlsList });
  };
  

  handleAdminControls = (key) => {
    const {adminControlsList}=this.state
    let required = adminControlsList.map((control) => {
      if (control.key === key) {
        control.value = control.value === "ENABLE" ? "DISABLE" : "ENABLE";
      }
      return control;
    });
    this.setState({
      adminControlsList: required,
    });
  };

  handleSubmitButton = async () => {
    try {
      const { adminControlsList } = this.state;
      const payload = {
        login: adminControlsList[0].value,
        register: adminControlsList[1].value,
        kyc: adminControlsList[2].value,
      };
      const response = await backEndCallObj("/admin/addControls", payload);
      toast.success("Admin Controls are updated successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    }
  };

  render() {
    const { adminControlsList } = this.state;
    if (!authService.IsAdmin()) {
      window.history.back();
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">ADMIN CONTROLS</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Admin Controls</th>
                        <th scope="col">Current Status</th>
                        <th scope="col">Enable / Disable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminControlsList &&
                        adminControlsList.map((control, index) => (
                          <tr key={index}>
                            <td>{control.heading}</td>
                            <td>{control.value}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-light"
                                onClick={() =>
                                  this.handleAdminControls(control.key)
                                }
                                style={{
                                  width: "150px",
                                  backgroundColor:
                                    Object.values(control)[0] === "DISABLE"
                                      ? "#28a745a8"
                                      : "rgb(240 110 32 / 76%)",
                                }}
                              >
                                {control.value === "ENABLE"
                                  ? "DISABLE"
                                  : "ENABLE"}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="card-footer d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleSubmitButton}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    getadmincontrols: state.getadmincontrols,
});

export default connect(mapStateToProps)(pushRoute(AdminControls));
