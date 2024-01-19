import React from "react";
import { pushRoute } from "../Services/pushRoute";
import Form from "../../common/form";
import { toast } from "react-toastify";
import authService from "../Services/authService";
import Joi from "joi-browser";
import { backEndCallObj } from "../Services/mainServiceFile";

class VerifyOtp extends Form {
  state = {
    countdown: 60,
    data: { otp: "", twofacode: "" },
    errors: {},
    btnDisabled: false,
    email: this.props.email,
    tfa_status: this.props.tfa_status,
  };

  componentDidMount() {
    this.startCountdown();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  schema = {
    otp: Joi.string()
      .length(6)
      .regex(/^\S(.*\S)?$/)
      .regex(/^[0-9]+$/)
      .error(() => {
        return {
          message: "OTP should contain 6 digits",
        };
      })
      .required()
      .label("OTP"),

    twofacode:
      this.state.tfa_status === "ENABLE"
        ? Joi.string()
            .regex(/^[0-9]+$/)
            .required()
            .label("Two Fa Code")
        : Joi.string()
            .regex(/^[0-9]+$/)
            .optional()
            .allow("")
            .label("Two Fa Code"),
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    const { data, email, tfa_status } = this.state;
    const otp = data.otp;
    try {
      const { navigate } = this.props;

      await authService.backEndCallVerifyOtp("/member/verifyOtp", {
        email,
        otp,
        token: tfa_status === "ENABLE" ? data.twofacode : "0",
      });

      navigate("/dashboard");
      toast.success("Logged in Successfully");
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
        setTimeout(() => {
          this.setState({ btnDisabled: false });
        }, 2000);
      }
    } finally {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
    }
  };

  handleResendOtp = async () => {
    this.setState({ btnDisabled: true });
    try {
      const { email } = this.state;
      const response = await backEndCallObj("/member/resendOtp", {
        email: email,
      });
      this.setState({ countdown: 60 });
      toast.success(response.message);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    } finally {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
    }
  };

  startCountdown = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, 1000);
  };

  render() {
    const { errors, btnDisabled, tfa_status, countdown } = this.state;

    return (
      <div className="row container-fluid signin-page h-100 align-items-center justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-12">
          <div className="card card-authentication1">
            <div className="card-body">
              <div className="card-content p-2">
                <div className="text-center mb-3">
                  <img
                    src="assets/images/logo2.png"
                    alt="logo icon"
                    className="logo"
                  />
                </div>
                <div className="card-title text-uppercase text-center">
                  Please enter 6 digit OTP and Verify to login
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group ">
                    <div className="position-relative has-icon-right">
                      {this.renderInput(
                        "otp",
                        "text",
                        "otp",
                        "Enter OTP",
                        "form-control input-shadow",
                        "6"
                      )}
                      <div className="form-control-position">
                        <i className="icon-lock"></i>
                      </div>

                      {errors.otp && (
                        <div className="text-danger mt-1 errorsClass">
                          {errors.otp}
                        </div>
                      )}
                    </div>
                  </div>

                  {tfa_status === "ENABLE" && (
                    <div className="form-group ">
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
                  )}

                  {this.renderButton(
                    "Verify",
                    "btn btn-primary btn-block mt-3",
                    btnDisabled
                  )}
                </form>
              </div>
              <div className="card-footer text-center">
                {countdown > 0 ? (
                  <p>Resend OTP in {countdown} seconds</p>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-block mt-3"
                    onClick={this.handleResendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(VerifyOtp);
