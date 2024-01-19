import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../AdminComponents/Services/authService";
import { pushRoute } from "../AdminComponents/Services/pushRoute";
class Sidebar extends Component {
  state = {
    pathname: "/dashboard",
  };

  componentDidMount() {
    this.checkAndUpdatePathname();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pathname !== window.location.pathname) {
      this.checkAndUpdatePathname();
    }
  }

  checkAndUpdatePathname() {
    const pathname = window.location.pathname;
    this.setState({ pathname })
  }

  handleMenuClick = () => {
    this.checkAndUpdatePathname();
    const pathname = window.location.pathname;
    this.setState({ pathname });
  };

  render() {
    const { pathname } = this.state;
    const { navigate } = this.props;
    return (
      <>
        <div
          id="sidebar-wrapper"
          data-simplebar=""
          data-simplebar-auto-hide="true"
        >
          <div style={{ height: "75px" }} className="d-flex align-items-center">
            <Link className="d-block text-center">
              <img
                src="assets/images/digifyme.png"
                alt="logo icon"
                style={{ width: "250px", cursor: "auto", padding: "20px" }}
              />
            </Link>
          </div>
          <ul className="sidebar-menu do-nicescrol">
            <li
              className={
                pathname === "/dashboard" || pathname === "/"
                  ? "selectedMenItem"
                  : ""
              }
              onClick={() => {
                navigate("/dashboard");
                this.handleMenuClick();
              }}
            >
              <Link to="/dashboard">
                <i
                  className="zmdi zmdi-view-dashboard"
                  style={{
                    color:
                      pathname === "/dashboard" || pathname === "/"
                        ? "white"
                        : "",
                  }}
                ></i>
                <span>DASHBOARD</span>
              </Link>
            </li>

            {authService.IsAdmin() && (
              <li
                className={
                  pathname === "/admincontrols" ? "selectedMenItem" : ""
                }
                onClick={() => {
                  this.handleMenuClick();
                }}
              >
                <Link to="/admincontrols">
                  <i
                    className="fa fa-lock"
                    style={{
                      color: pathname === "/admincontrols" ? "white" : "",
                    }}
                  ></i>
                  <span>ADMIN CONTROLS</span>
                </Link>
              </li>
            )}

            <li
              className={pathname === "/allkychistory" ? "selectedMenItem" : ""}
              onClick={() => {
                navigate("/allkychistory");
                this.handleMenuClick();
              }}
            >
              <Link to="/allkychistory">
                <i
                  className="fa fa-file"
                  style={{
                    color: pathname === "/allkychistory" ? "white" : "",
                  }}
                ></i>
                <span>KYC HISTORY</span>
              </Link>
            </li>

            <li
              className={
                pathname === "/allcreditshistory" ? "selectedMenItem" : ""
              }
              onClick={() => {
                navigate("/allcreditshistory");
                this.handleMenuClick();
              }}
            >
              <Link to="/allcreditshistory">
                <i
                  className="fa fa-dollar"
                  style={{
                    color: pathname === "/allcreditshistory" ? "white" : "",
                  }}
                ></i>
                <span>CREDITS HISTORY</span>
              </Link>
            </li>
            {authService.IsAdmin() && (
              <li
                className={pathname === "/adduser" ? "selectedMenItem" : ""}
                onClick={() => {
                  navigate("/adduser");
                  this.handleMenuClick();
                }}
              >
                <Link to="/adduser">
                  <i
                    className="zmdi zmdi-account-circle"
                    style={{
                      color: pathname === "/adduser" ? "white" : "",
                    }}
                  ></i>
                  <span>ADD USER</span>
                </Link>
              </li>
            )}
            {authService.IsAdmin() && (
              <li
                className={pathname === "/userslist" ? "selectedMenItem" : ""}
                onClick={() => {
                  navigate("/userslist");
                  this.handleMenuClick();
                }}
              >
                <Link to="/userslist">
                  <i
                    className="zmdi zmdi-format-list-bulleted"
                    style={{
                      color: pathname === "/userslist" ? "white" : "",
                    }}
                  ></i>{" "}
                  <span>USERS LIST</span>
                </Link>
              </li>
            )}

            {authService.IsAdmin() && (
              <li
                className={pathname === "/profile" ? "selectedMenItem" : ""}
                onClick={() => {
                  navigate("/profile");
                  this.handleMenuClick();
                }}
              >
                <Link to="/profile">
                  <i
                    className="fa fa-user"
                    style={{
                      color: pathname === "/profile" ? "white" : "",
                    }}
                  ></i>{" "}
                  <span>PROFILE</span>
                </Link>
              </li>
            )}

            {!authService.IsAdmin() && (
              <li
                className={
                  pathname === "/generateAppid" ? "selectedMenItem" : ""
                }
                onClick={() => {
                  navigate("/generateAppid");
                  this.handleMenuClick();
                }}
              >
                <Link to="/generateAppId">
                  <i
                    className="fa fa-key"
                    style={{
                      color:
                        pathname === "/generateAppId" || pathname === "/"
                          ? "white"
                          : "",
                    }}
                  ></i>
                  <span>APP ID</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default pushRoute(Sidebar);
