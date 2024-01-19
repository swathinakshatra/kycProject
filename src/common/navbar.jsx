import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-dropdown/style.css";
import { pushRoute } from "../AdminComponents/Services/pushRoute";
import authService from "../AdminComponents/Services/authService";
import user from "../assets/user.png";

class NavBar extends Component {
  state = {
    name: "",
    email: "",
  };

  componentDidMount() {
    const response = authService.getCurrentUser();
    this.setState({
      tfa_status: response.tfa_status,
      name: response.name,
      email: response.email,
    });
  }

  handlelogout = () => {
    const { navigate } = this.props;
    authService.logout();
    navigate("/loginform");
  };

  

  render() {
    const { navigate, handleSidebarToggle } = this.props;
    const { name, email} = this.state;
    return (
      <>
        <nav className="navbar navbar-expand fixed-top">
          <ul className="navbar-nav mr-auto align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link toggle-menu"
                onClick={handleSidebarToggle}
              >
                <i className="icon-menu menu-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <form className="search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter keywords"
                />
                <Link>
                  <i className="icon-magnifier"></i>
                </Link>
              </form>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center right-nav-link">
            <li className="nav-item dropdown-lg">
              <Link
                className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                data-toggle="dropdown"
              >
                <i className="fa fa-envelope-open-o"></i>
              </Link>
            </li>
            <li className="nav-item dropdown-lg">
              <Link
                className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                data-toggle="dropdown"
              >
                <i className="fa fa-bell-o"></i>
              </Link>
            </li>
            <li className="nav-item dropdown-lg">
              <Link
                className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                data-toggle="dropdown"
              >
                <i className="fa fa-plus"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                type="button"
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                data-bs-toggle="dropdown"
              >
                <span className="user-profile">
                  <img src={user} className="img-circle" alt="user avatar" />
                </span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-right">
                <li className="dropdown-item user-details">
                  <Link>
                    <div className="media">
                      <div className="avatar">
                        <img
                          className="img-circle mr-3"
                          src={user}
                          alt="user avatar"
                        />
                      </div>
                      <div className="media-body">
                        <h6 className="mt-2 user-title">{name}</h6>
                        <p className="user-subtitle">{email}</p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-item cursor">
                  <i className="icon-envelope mr-2"></i> Inbox
                </li>
                <li className="dropdown-divider"></li>

                <li className="dropdown-divider"></li>

                <li className="dropdown-item cursor">
                  <i className="icon-settings mr-2"></i> Setting
                </li>

                <li className="dropdown-divider"></li>
                {!authService.IsAdmin() && (
                  <li
                    className="dropdown-item cursor"
                    onClick={() => navigate("/changepassword")}
                  >
                    <i className="icon-lock mr-2"></i> Change Password
                  </li>
                )}

                <li className="dropdown-divider"></li>
                <li
                  className="dropdown-item cursor"
                  onClick={this.handlelogout}
                >
                  <i className="icon-power mr-2"></i> Logout
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default pushRoute(NavBar);
