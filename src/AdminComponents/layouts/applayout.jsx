import React, { Component } from "react";
import {  Outlet } from "react-router-dom";
import Footer from "../../common/footer";
import Sidebar from "../../common/sidebar";
import NavBar from "../../common/navbar";
import { Link } from "react-router-dom";
import { pushRoute } from "../Services/pushRoute";

class AppLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarToggled: false,
    };
  }

  handleSidebarToggle = () => {
    this.setState((prev) => ({
      sidebarToggled: !prev.sidebarToggled,
    }));
  };

  render() {
    return (
      <div
        id="wrapper"
        className={`${this.state.sidebarToggled ? "sidebar-toggled" : ""}`}
      >
        <Sidebar />
        <header className="topbar-nav">
          <NavBar handleSidebarToggle={this.handleSidebarToggle} />
        </header>

        <div className="clearfix"></div>

        <div className="content-wrapper">
          <Outlet />
        </div>

        <Link className="back-to-top">
          <i className="fa fa-angle-double-up"></i>{" "}
        </Link>

        <Footer />
      </div>
    );
  }
}

export default pushRoute(AppLayout);
