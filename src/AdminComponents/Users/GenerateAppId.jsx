import React  from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Form from "../../common/form";
import authService from "../Services/authService";
import { backEndCallObj } from "../Services/mainServiceFile";
import { toast } from "react-toastify";
import {  Modal } from "react-bootstrap";
import Joi from "joi-browser";
import { connect } from "react-redux";
import get_AppId from "../../Redux/action/getAppIdAction";

class GenerateAppId extends Form {
  state = {
    selectedTab: 0,
    errors: {},
    btnDisabled: false,
    email: "",
    apiKeysFields: false,
    appId_key: "",
    url: "",
    refNo: "",
    inpt1: false,
    inpt2: false,
    inpt3: false,
    inpt4: false,
    inpt5: false,
    inpt6: false,
    popUp: false,
    data: {
      appName: "",
      successUrl: "",
      notifyUrl: "",
    },
    phoneNumber: "",
  };

  componentDidMount = async () => {
    const response = authService.getCurrentUser().email || "";
      this.setState({ email: response });
      if (this.props?.getappid === null) {
        await get_AppId("/user/getKeys", response);
        this.setState({
          appId_key: this.props?.getappid?.appId_key,
          appName: this.props?.getappid?.appName,
          apiKeysFields: true,
          successUrl: this.props?.getappid?.successUrl,
          notifyUrl: this.props?.getappid?.notifyUrl,
        });
      }
      this.setState({
        appId_key: this.props?.getappid?.appId_key,
        appName: this.props?.getappid?.appName,
        apiKeysFields: true,
        successUrl: this.props?.getappid?.successUrl,
        notifyUrl: this.props?.getappid?.notifyUrl,
      });
  };

 

  copyToClipboard = async (value, state) => {
    this.setState({ copied: false });
    try {
      await navigator.clipboard.writeText(value);
      this.setState({ [state]: true });

      setTimeout(() => {
        this.setState({ [state]: false });
      }, 3000);
    } catch (error) {
      toast.error("Error copying to clipboard");
    }
  };

  handleTabSelect = (index) => {
    this.setState({ selectedTab: index });
  };

  schema = {
    appName: Joi.string().required().label("App Name").min(3).max(55),

    successUrl: Joi.string()
      .required()
      .uri({ scheme: ["http", "https"] })
      .error(() => {
        return {
          message: "Invalid Success Url",
        };
      })
      .label("Success Url"),

    notifyUrl: Joi.string()
      .required()
      .uri({ scheme: ["http", "https"] })
      .error(() => {
        return {
          message: "Invalid Notify Url",
        };
      })
      .label("Notify Url"),
  };

  getAppId = async () => {
    this.setState({ popUp: true });
  };

  handleShow = () => {
    this.setState({ popUp: true });
  };

  handleClose = () => {
    this.setState({ popUp: false });
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    const { email, data } = this.state;
    setTimeout(() => {
      this.setState({ btnDisabled: false });
    }, 2000);
    try {
      const response = await backEndCallObj("/user/generateKeys", {
        email: email,
        appName: data.appName,
        successUrl: data.successUrl,
        notifyUrl: data.notifyUrl,
      });
      this.setState({
        popUp: false,
        apiKeysFields: true,
        appId_key:response.appId_key,
        appName: response.appName,
        successUrl: response.successUrl,
        notifyUrl: response.notifyUrl,
        data: {
          appName: "",
          successUrl: "",
          notifyUrl: "",
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    if (authService.IsAdmin()) {
      window.history.back();
    }
    const {
      selectedTab,
      btnDisabled,
      appId_key,
      inpt1,
      inpt2,
      inpt3,
      inpt4,
      inpt5,
      inpt6,
      popUp,
      data,
      errors,
      appName,
      successUrl,
      notifyUrl,
    } = this.state;
    var CurrentUrl = window.location.origin;
    const url = `${CurrentUrl}/modals?appIdKey=${appId_key}&refNo=<yourrefnumber>&phoneNumber=<yourphoneNumber>`;
    const prodUrl = `${CurrentUrl}/modals?appIdKey=${appId_key}&refNo=<yourrefnumber>&phoneNumber=<yourphoneNumber>`;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="">
                    <Tabs
                      selectedIndex={selectedTab}
                      onSelect={this.handleTabSelect}
                    >
                      <TabList className="list-unstyled d-flex">
                        <Tab
                          className="text-center py-2 px-3 flex-grow-1 items-tab"
                          type="button"
                        >
                          Staging
                        </Tab>
                        <Tab
                          className="text-center py-2 px-3 flex-grow-1 items-tab"
                          type="button"
                        >
                          Production
                        </Tab>
                      </TabList>
                      <TabPanel>
                        {appId_key === "0" ? (
                          <button
                            className="btn btn-primary "
                            onClick={this.getAppId}
                            disabled={btnDisabled}
                          >
                            <i className="fa fa-plus"></i> Generate App Id
                          </button>
                        ) : (
                          <>
                            <div className="form-group">
                              <div className="mb-3">
                                <label className="mb-1 ">App Name</label>

                                <div className="form-group mb-0 position-relative has-icon-right ">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-2"
                                    value={appName}
                                    disabled
                                  />

                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(appName, "inpt2")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt2 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="mb-1">App Id Key</label>
                                <div className="form-group mb-0 position-relative has-icon-right ">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-1"
                                    value={appId_key}
                                    disabled
                                  />
                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(appId_key, "inpt1")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt1 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="mb-1">Staging URL</label>

                                <div className="form-group mb-0 position-relative has-icon-right ">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-3"
                                    value={url}
                                    disabled
                                  />
                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(url, "inpt3")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt3 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label className="mb-1">Success Url</label>

                                  <div className="form-group mb-0 position-relative has-icon-right ">
                                    <input
                                      type="text"
                                      className="form-control absoluteClass"
                                      id="input-2"
                                      value={successUrl}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label className="mb-1">Notify Url</label>

                                  <div className="form-group mb-0 position-relative has-icon-right ">
                                    <input
                                      type="text"
                                      className="form-control absoluteClass"
                                      id="input-2"
                                      value={notifyUrl}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center ">
                              <button
                                className="btn btn-primary regen-btn"
                                onClick={this.getAppId}
                                disabled={btnDisabled}
                              >
                                <i className="fa fa-plus"></i> Regenerate App Id
                              </button>
                            </div>
                          </>
                        )}
                      </TabPanel>

                      <TabPanel>
                        {appId_key === "0" ? (
                          <button
                            className="btn btn-primary "
                            onClick={this.getAppId}
                            disabled={btnDisabled}
                          >
                            <i className="fa fa-plus"></i> Generate App Id
                          </button>
                        ) : (
                          <>
                            <div className="form-group">
                              <div className="mb-3">
                                <label className="mb-1">App Name</label>
                                <div className="form-group mb-0 position-relative has-icon-right ">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-5"
                                    value={appName}
                                    disabled
                                  />
                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(appName, "inpt5")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt5 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="mb-1">App Id Key</label>
                                <div className="form-group mb-0 position-relative has-icon-right">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-4"
                                    value={appId_key}
                                    disabled
                                  />
                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(appId_key, "inpt4")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt4 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="mb-1">Production URL</label>

                                <div className="form-group mb-0 position-relative has-icon-right ">
                                  <input
                                    type="text"
                                    className="form-control absoluteClass"
                                    id="input-6"
                                    value={prodUrl}
                                    disabled
                                  />
                                  <div
                                    className="form-control-position"
                                    onClick={() =>
                                      this.copyToClipboard(prodUrl, "inpt6")
                                    }
                                  >
                                    <i
                                      className="fa fa-clipboard cursor"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                                {inpt6 && (
                                  <span className="float-right">Copied</span>
                                )}
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <label className="mb-1">Success Url</label>

                                  <div className="form-group mb-0 position-relative has-icon-right ">
                                    <input
                                      type="text"
                                      className="form-control absoluteClass"
                                      id="input-2"
                                      value={successUrl}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label className="mb-1">Notify Url</label>

                                  <div className="form-group mb-0 position-relative has-icon-right ">
                                    <input
                                      type="text"
                                      className="form-control absoluteClass"
                                      id="input-2"
                                      value={notifyUrl}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center ">
                              <button
                                className="btn btn-primary regen-btn"
                                onClick={this.getAppId}
                                disabled={btnDisabled}
                              >
                                <i className="fa fa-plus"></i> Regenerate App Id
                              </button>
                            </div>
                          </>
                        )}
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={popUp}
          onHide={this.handleClose}
          centered
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Generate App Id</Modal.Title>
            <span
              className="cursor"
              onClick={() => this.setState({ popUp: false })}
            >
              <i className="fa fa-times"></i>
            </span>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="mb-1">App Name</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "appName",
                        "text",
                        "appName",
                        "Please enter your App name",
                        "form-control input-shadow"
                      )}
                    </div>
                    {errors.appName && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.appName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="mb-1">Success Url</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "successUrl",
                        "text",
                        "successUrl",
                        "Please enter your Success Url",
                        "form-control input-shadow"
                      )}
                    </div>
                    {errors.successUrl && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.successUrl}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="mb-1">Notify Url</label>
                    <div className="form-group position-relative has-icon-right mb-0">
                      {this.renderInput(
                        "notifyUrl",
                        "text",
                        "notifyUrl",
                        "Please enter your Notify Url",
                        "form-control input-shadow"
                      )}
                    </div>
                    {errors.notifyUrl && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.notifyUrl}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center">
                {this.renderButton("Submit", "btn btn-primary", btnDisabled)}
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer className="text-center">
            {/* <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getappid: state.getappid,
  };
};

export default connect(mapStateToProps)(GenerateAppId);
