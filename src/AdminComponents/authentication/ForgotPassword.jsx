import React from "react";
import { Link } from "react-router-dom";
import { pushRoute } from "../Services/pushRoute";
import Form from "../../common/form";
import { toast } from "react-toastify";
import authService from "../Services/authService";
import Joi from "joi-browser";

class ForgotPassword extends Form {
  state = {
    data: { email: "" },
    errors: {},
    btnDisabled: false,
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
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    try {
      const { data } = this.state;
      const { navigate } = this.props;

      await authService.backEndCallVerifyOtp(
        "/user/forgotPassword",
        {
          email: data.email,
        }
      );

      navigate("/resetpassword", { state: { email: this.state.data } });
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
  };

  render() {
    const { navigate } = this.props;
    const {  errors, btnDisabled } = this.state;

    return (
      <div className="row container-fluid signin-page h-100 align-items-center justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-12">
          <div className="card card-authentication1">
            <div className="card-body">
              <div className="card-content p-2">
                <div className="card-title text-uppercase pb-2">
                  Forgot Password
                </div>
                <p className="pb-2">Please enter your registered Email Id.</p>
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

                  {this.renderButton(
                    "Forgot Password",
                    "btn btn-primary btn-block mt-3",
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

        <Link className="back-to-top">
          <i className="fa fa-angle-double-up"></i>{" "}
        </Link>
      </div>
    );
  }
}

export default pushRoute(ForgotPassword);
