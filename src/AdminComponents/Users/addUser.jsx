import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { toast } from "react-toastify";
import { backEndCallObj } from "../Services/mainServiceFile";
import authService from "../Services/authService";
import { pushRoute } from "../Services/pushRoute";

class AddUser extends Form {
  state = {
    data: {
      name: "",
      email: "",
      organization: "",
      password: "",
      confirmpassword: "",
    },
    errors: {},
    btnDisabled: false,
    passwordtoggle: false,
    confirmpasswordtoggle: false,
    registerStatus: "",
  };

  componentDidMount = async () => {
    try{
      const { navigate } = this.props;
      const token = await authService.getCurrentUser();
      if (!token) {
        navigate("/loginform");
      }
      const email = token.email || "";
  
      const response = await backEndCallObj("/admin/getControls", {
        email: email,
      });
      this.setState({ registerStatus: response.register });
    }
    catch(ex){
      
    }
  };

  schema = {
    name: Joi.string()
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .error(() => {
        return {
          message:
            "Name Should Not Contain Special Characters, Numbers And Spaces At Beginning/End",
        };
      })
      .required()
      .label("First Name")
      .min(3)
      .max(55),
    email: Joi.string()
      .email()
      .regex(/^\S(.*\S)?$/)

      .error(() => {
        return {
          message: "Email Should Not Contain Spaces At Beginning/End",
        };
      })
      .required()
      .label("Email")
      .min(5)
      .max(255),

    organization: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Organization Should Not Contain Special Characters Or Spaces At Beginning/End",
        };
      })
      .regex(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)

      .allow("")
      .label("Organization")
      .min(3)
      .max(55),
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
    confirmpassword: Joi.string()
      .required()
      .label("Confirm Password")
      .min(8)
      .max(1024),
  };

  handlePasswordToggle = () => {
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
    const { navigate } = this.state;
    this.setState({ btnDisabled: true });
    setTimeout(() => {
      this.setState({ btnDisabled: false });
    }, 2000);
    const { data } = this.state;
    if (data.password !== data.confirmpassword) {
      toast.error("Password and ConfirmPassword Should match");
    } else {
      try {
        const { navigate } = this.props;

        const response = await backEndCallObj("/admin/registerUser", {
          name: data.name,
          email: data.email,
          organization: data.organization,
          password: data.password,
          confirmPassword: data.confirmpassword,
        });

        this.setState({
          data: {
            name: "",
            email: "",
            organization: "",
            password: "",
            confirmpassword: "",
          },
        });

        toast.success("User Added successfully");
        navigate("/userslist");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
        }
      }
    }
  };

  render() {
    const { navigate } = this.props;
    const { data, errors, btnDisabled, registerStatus } = this.state;
    console.log(this.state.data.email,this.state.data.password)

    return (
      <div className="col-lg-12">
        {registerStatus === "DISABLE" && (
          <p className="text-center text-dark">
            <span className="tx-red">Note:</span> Can not register new user
            against Admin Controls
          </p>
        )}

        <div className="card">
          <div className="card-body">
            <div className="card-title">ADD NEW USER </div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label className="mb-1">Name</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "name",
                        "text",
                        "name",
                        "Please enter your name",
                        "form-control input-shadow"
                      )}
                      <div className="form-control-position">
                        <i className="icon-user"></i>
                      </div>
                    </div>
                    {errors.name && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Organization Name</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "organization",
                        "text",
                        "organization",
                        "Please enter your Organization Name",
                        "form-control input-shadow"
                      )}
                      <div className="form-control-position">
                        <i className="fa fa-building-o"></i>
                      </div>
                    </div>
                    {errors.organization && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.organization}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Confirm Password</label>
                    <div className="form-group position-relative has-icon-right mb-0">
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
                      {errors.confirmpassword && (
                        <div className="text-danger mt-1 errorsClass">
                          {errors.confirmpassword}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label className="mb-1">Email Id</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "email",
                        "text",
                        "email",
                        "Please enter your Email Id",
                        "form-control input-shadow"
                      )}
                      <div className="form-control-position">
                        <i className="icon-envelope"></i>
                      </div>
                    </div>
                    {errors.email && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Password</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "password",
                        this.state.passwordtoggle ? "text" : "password",
                        "password",
                        "Enter Password",
                        "form-control input-shadow"
                      )}
                      <div
                        className="form-control-position"
                        onClick={this.handlePasswordToggle}
                      >
                        <i
                          className={`cursor fa-regular ${
                            this.state.passwordtoggle
                              ? "fa fa-eye"
                              : " fa fa-eye-slash"
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
                </div>
              </div>
              {/* <div class="form-group py-2">
                <div class="icheck-material-white">
                  <input type="checkbox" id="user-checkbox2" checked="" />
                  <label for="user-checkbox2">I Agree Terms & Conditions</label>
                </div>
              </div> */}

              <div className="text-center">
                {this.renderButton("Register", "btn btn-primary", btnDisabled)}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(AddUser);
