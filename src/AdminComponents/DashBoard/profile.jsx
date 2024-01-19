import React, { Component } from "react";
import authService from "../Services/authService";
import { toast } from "react-toastify";
import { backEndCallObj } from "../Services/mainServiceFile";
import { pushRoute } from "../Services/pushRoute";

class Profile extends Component {
  state = {
    tfa_status: "",
    email: "",
  };

  componentDidMount() {
    const response = authService.getCurrentUser();
    this.setState({ tfa_status: response.tfa_status, email: response.email });
  }

  handleChangetwoFaStatus = async () => {
    const { email, tfa_status } = this.state;
    const { navigate } = this.props;
    try {
      if (tfa_status !== "ENABLE") {
        const response = await backEndCallObj("/admin/tfa", {
          email: email,
        });
        if (response) {
          navigate("/qrcode", {
            state: { qr: response.qr, secret: response.secret },
          });
        }
      } else {
        navigate("/qrcode");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    }
  };

  render() {
    const { tfa_status } = this.state;
    if (!authService.IsAdmin()) {
      window.history.back();
    }

    return (
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="card-title">TWO FACTOR AUTHENTICATION</div>
            <h4>
              Click below button to
              {tfa_status === "ENABLE" ? " Disable " : " Enable "}
              Two Factor Authentication
            </h4>
            <hr />
            <div className="twofa" />
            <button
              type="button"
              className="btn btn-primary btn-block mb-3"
              onClick={this.handleChangetwoFaStatus}
              style={{ width: "200px" }}
            >
              {tfa_status === "ENABLE" ? "TwoFa Disable" : "TwoFa Enable"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(Profile);
