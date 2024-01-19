import React from "react";
import { Navigate } from "react-router-dom";
import { pushRoute } from "../Services/pushRoute";
import Joi from "joi-browser";
import Form from "../../common/form";
import { toast } from "react-toastify";
import authService from "../Services/authService";
import VerifyOtp from "./VerifyOtp";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    btnDisabled: false,
    passwordtoggle: false,
    otp: false,
    tfa_status: "",
  };

  schema = {
    email: Joi.string()
      .email()
      .regex(/^\S(.*\S)?$/)

      .error(() => {
        return {
          message: "Email Should Not Contain Spaces At Beginning / End",
        };
      })
      .required()
      .label("Email")
      .min(5)
      .max(255),

    password: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Password Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number, 1 Special Character And Should Not Contain Spaces At Beginning/End",
        };
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .regex(/^\S(.*\S)?$/)
      .label("Password")
      .min(8)
      .max(1024),
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    try {
      const { data } = this.state;

      const response = await authService.login(data.email, data.password);
      this.setState({ otp: "true", tfa_status: response.tfa_status });
      toast.success(response.message);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    } finally {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
    }
  };

  handlePasswordToggle = () => {
    this.setState((prevState) => ({
      passwordtoggle: !prevState.passwordtoggle,
    }));
  };

  render() {

    const { navigate } = this.props;
    const { data, errors, btnDisabled, tfa_status, otp, passwordtoggle } =
      this.state;
    if (authService.getCurrentUser()) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="row container-fluid signin-page h-100 align-items-center justify-content-center">
        {otp ? (
          <VerifyOtp email={data.email} tfa_status={tfa_status} />
        ) : (
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
                  <div className="card-title text-uppercase text-center ">
                    Sign In
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="position-relative has-icon-right">
                        {this.renderInput(
                          "email",
                          "text",
                          "email",
                          "Enter Your Email",
                          "form-control input-shadow"
                        )}
                        <div className="form-control-position">
                          <i className="icon-user"></i>
                        </div>
                      </div>
                      {errors.email && (
                        <div className="text-danger mt-1 errorsClass">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <div className="position-relative has-icon-right">
                        {this.renderInput(
                          "password",
                          passwordtoggle ? "text" : "password",
                          "password",
                          "Enter Your Password",
                          "form-control input-shadow"
                        )}
                        <div
                          className="form-control-position"
                          onClick={this.handlePasswordToggle}
                        >
                          <i
                            className={`cursor fa-regular ${
                              passwordtoggle ? "fa fa-eye" : "fa fa-eye-slash"
                            }`}
                          ></i>
                        </div>
                      </div>
                      {errors.password && (
                        <div className="text-danger mt-1 errorsClass">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-group mt-0 text-right">
                      <span
                        className="cursor"
                        onClick={() => navigate("/forgotpassword")}
                      >
                        Forgot Password ?
                      </span>
                    </div>

                    {this.renderButton(
                      "Login",
                      "btn btn-primary btn-block",
                      btnDisabled
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default pushRoute(LoginForm);
