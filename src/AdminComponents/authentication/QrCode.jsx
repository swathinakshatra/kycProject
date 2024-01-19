import React from "react";
import authService from "../Services/authService";
import Form from "../../common/form";
import { pushRoute } from "../Services/pushRoute";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class QRCode extends Form {
  state = {
    data: { twofacode: "" },
    errors: {},
    btnDisabled: false,
    email: "",
    qr: this.props?.location?.state?.qr || "",
    secret: this.props?.location?.state?.secret || "",
    tfa_status: "",
  };

  componentDidMount = async () => {
    const response = authService.getCurrentUser();
    this.setState({ email: response.email, tfa_status: response.tfa_status });
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    const { data, email, tfa_status } = this.state;

    try {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
      const { navigate } = this.props;
      const route =
        tfa_status !== "ENABLE" ? "/admin/tfaVerify" : "/admin/tfaDisable";

      const response = await authService.backEndCallVerifyOtp(route, {
        email: email,
        token: data.twofacode,
      });
      authService.logout();
      navigate("/loginform");

      toast.success(response.data.message);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    }
  };

  schema = {
    twofacode: Joi.string()
      .regex(/^[0-9]+$/)
      .error(() => {
        return {
          message: "TwoFa Code should contain 6 digits",
        };
      })
      .required()
      .label("Two Fa Code"),
  };

  render() {
    const { errors, btnDisabled, qr, tfa_status } = this.state;
    return (
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <Link to="/profile">
              <i className="icon-arrow-left"></i>
            </Link>
            <div className="card-title">
              Set up authenticator app in 3 steps
            </div>

            <hr />
            <p>
              1.Install or open a third party authenticator app like Google
              Authenticator , Authy, etc.
            </p>
            <p>2.Scan QR code below with the authenticator</p>
            <p>3.Enter the 6-digit code you see in the authenticator</p>
            <div className="mb-3">
              {tfa_status !== "ENABLE" && (
                <img src={qr} alt="QR Code" className="qrClass" />
              )}
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-8 col-xl-6">
                  <div className="form-group">
                    <div className="position-relative has-icon-right">
                      {this.renderInput(
                        "twofacode",
                        "text",
                        "twofacode",
                        "Enter TwoFA Code",
                        "form-control input-shadow",
                        "6"
                      )}
                      <div className="form-control-position">
                        <i className="icon-lock"></i>
                      </div>
                    </div>
                    {errors.twofacode && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.twofacode}
                      </div>
                    )}
                  </div>

                  {this.renderButton("Submit", "btn btn-primary", btnDisabled)}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(QRCode);
