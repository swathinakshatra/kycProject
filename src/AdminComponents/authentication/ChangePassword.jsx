import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { toast } from "react-toastify";
import { backEndCallObj } from "../Services/mainServiceFile";
import { pushRoute } from "../Services/pushRoute";
import authService from "../Services/authService";
import { Modal, Button } from "react-bootstrap";

class ChangePassword extends Form {
  state = {
    data: { oldpassword: "", newpassword: "", confirmpassword: "" },
    errors: {},
    btnDisabled: false,
    oldpasswordtoggle: false,
    newpasswordtoggle: false,
    confirmpasswordtoggle: false,
    showModal: false,
  };

  componentDidMount() {
    const response = authService.getCurrentUser();
    this.setState({ email: response.email });
  }

  schema = {
    oldpassword: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Password Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number, and 1 Special Character",
        };
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .label("Old Password")
      .min(8)
      .max(1024),
    newpassword: Joi.string()
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

  handleOldPasswordToggle = () => {
    this.setState((prevState) => ({
      oldpasswordtoggle: !prevState.oldpasswordtoggle,
    }));
  };

  handlenewPasswordToggle = () => {
    this.setState((prevState) => ({
      newpasswordtoggle: !prevState.newpasswordtoggle,
    }));
  };

  handleconfirmPasswordToggle = () => {
    this.setState((prevState) => ({
      confirmpasswordtoggle: !prevState.confirmpasswordtoggle,
    }));
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true, showModal: true });
  };

  handlelogout = async () => {
    const { navigate } = this.props;

    const { data, email } = this.state;
    if (data.newpassword !== data.confirmpassword) {
      toast.error("Password and ConfirmPassword Should match");
    } else {
      try {
        const response = await backEndCallObj("/user/changePassword", {
          email: email,
          password: data.oldpassword,
          newPassword: data.newpassword,
        });
        toast.success(response.message);
        this.setState({ showModal: false });
        authService.logout();
        navigate("/loginform");
        setTimeout(() => {
          this.setState({ btnDisabled: false });
        }, 2000);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response?.data);
          this.setState({ showModal: false });
          setTimeout(() => {
            this.setState({ btnDisabled: false });
          }, 2000);
        }
      }
    }
  };

  render() {
    const {
      errors,
      btnDisabled,
      showModal,
      newpasswordtoggle,
      oldpasswordtoggle,
      confirmpasswordtoggle,
    } = this.state;
    if (authService.IsAdmin()) {
      window.history.back();
    }

    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="card-title">Change Password</div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="form-group">
                    <label className="mb-1">Old Password</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "oldpassword",
                        oldpasswordtoggle ? "text" : "password",
                        "oldpassword",
                        "Enter Your Old Password",
                        "form-control input-shadow"
                      )}
                      <div
                        className="form-control-position"
                        onClick={this.handleOldPasswordToggle}
                      >
                        <i
                          className={`cursor fa-regular ${
                            this.state.oldpasswordtoggle
                              ? "fa fa-eye"
                              : "fa fa-eye-slash"
                          }`}
                        ></i>
                      </div>
                    </div>
                    {errors.oldpassword && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.oldpassword}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="mb-1">New Password</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "newpassword",
                        this.state.newpasswordtoggle ? "text" : "password",
                        "newpassword",
                        "Please Enter your New password",
                        "form-control input-shadow"
                      )}
                      <div
                        className="form-control-position"
                        onClick={this.handlenewPasswordToggle}
                      >
                        <i
                          className={`cursor fa-regular ${
                            newpasswordtoggle ? "fa fa-eye" : "fa fa-eye-slash"
                          }`}
                        ></i>
                      </div>
                    </div>
                    {errors.newpassword && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.newpassword}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="mb-1">Confirm Password</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "confirmpassword",
                        confirmpasswordtoggle ? "text" : "password",
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
                            confirmpasswordtoggle
                              ? "fa fa-eye"
                              : " fa fa-eye-slash"
                          }`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                {this.renderButton(
                  "Change Password",
                  "btn btn-primary",
                  btnDisabled
                )}
              </div>
            </form>
          </div>
        </div>
        <Modal show={showModal}>
          <Modal.Body>
            <p>About to change password</p>
            <p>
              After Password Changed successfully , You will be logged out.
              Please re-login with your new password .
            </p>
          </Modal.Body>
          <Modal.Footer className="text-center">
            <Button variant="primary" onClick={this.handlelogout}>
              Proceed
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                this.setState({ showModal: false, btnDisabled: false })
              }
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default pushRoute(ChangePassword);
