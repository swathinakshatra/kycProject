import React from "react";
import { Navigate } from "react-router-dom";
import { pushRoute } from "../Services/pushRoute";
import Joi from "joi-browser";
import Form from "../../common/form";
import { toast } from "react-toastify";
import { backEndCallObj } from "../Services/mainServiceFile";
import authService from "../Services/authService";

class ResetPassword extends Form {
  state = {
    data: { password: "", confirmpassword: "" },
    email: this.props?.location?.state.email.email || "",
    errors: {},
    btnDisabled: false,
    passwordtoggle: false,
    confirmpasswordtoggle: false,
  };

  schema = {
    password: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Password Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number, and 1 Special Character",
        };
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .label("New Password")
      .min(8)
      .max(1024),
    confirmpassword: Joi.string()
      .required()
      .label("Confirm Password")
      .min(8)
      .max(1024),
  };

  handlepasswordToggle = () => {
    this.setState((prevState) => ({
      passwordtoggle: !prevState.passwordtoggle,
    }));
  };

  handleconfirmPasswordToggle = () => {
    this.setState((prevState) => ({
      confirmpasswordtoggle: !prevState.confirmpasswordtoggle,
    }));
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });

    const { data, email } = this.state;
    if (data.password !== data.confirmpassword) {
      toast.error("Password and ConfirmPassword Should match");
    } else {
      try {
        const { navigate } = this.props;

        const response = await backEndCallObj("/user/resetPassword", {
          email: email,
          password: data.password,
          confirmPassword: data.confirmpassword,
        });

        toast.success("Password Reset was successfull");
        navigate("/loginform");
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
      }
    }
  };

  render() {
    const { navigate } = this.props;

    const { data, errors, btnDisabled, userLoginToggle } = this.state;
    if (authService.getCurrentUser()) {
      return <Navigate to="/dashboard" />;
    }

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
                  Reset Password
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="position-relative has-icon-right">
                      {this.renderInput(
                        "password",
                        this.state.passwordtoggle ? "text" : "password",
                        "password",
                        "Please Enter your New password",
                        "form-control input-shadow"
                      )}
                      <div
                        className="form-control-position"
                        onClick={this.handlepasswordToggle}
                      >
                        <i
                          className={`cursor fa-regular ${
                            this.state.passwordtoggle
                              ? "fa fa-eye"
                              : "fa fa-eye-slash"
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
                  <div className="form-group">
                    <div className="position-relative has-icon-right">
                      {this.renderInput(
                        "confirmpassword",
                        this.state.confirmpasswordtoggle ? "text" : "password",
                        "confirmpassword",
                        "Please confirm your password",
                        "form-control input-shadow"
                      )}
                      <div
                        className="form-control-position"
                        onClick={this.handleconfirmPasswordToggle}
                      >
                        <i
                          className={`cursor fa-regular ${
                            this.state.confirmpasswordtoggle
                              ? "fa fa-eye"
                              : "fa fa-eye-slash"
                          }`}
                        ></i>
                      </div>
                    </div>
                    {errors.confirmpassword && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.confirmpassword}
                      </div>
                    )}
                  </div>

                  {this.renderButton(
                    "Reset Password",
                    "btn btn-primary btn-block",
                    btnDisabled
                  )}
                </form>

                <hr className="mb-2" />

                <div className="text-center">
                  <span
                    className="cursor"
                    onClick={() => navigate("/loginform")}
                  >
                    Login
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(ResetPassword);
