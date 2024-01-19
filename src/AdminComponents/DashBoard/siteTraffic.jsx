import React, { Component } from "react";
import { Link } from "react-router-dom";
class SiteTraffic extends Component {
  state = {};
  render() {
    return (
      <div className="col-12 col-lg-8 col-xl-8">
        <div className="card">
          <div className="card-header">
            Site Traffic
            <div className="card-action">
              <div className="dropdown">
                <Link
                  className="dropdown-toggle dropdown-toggle-nocaret"
                  data-toggle="dropdown"
                >
                  <i className="icon-options"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item">Action</Link>
                  <Link className="dropdown-item">Another action</Link>
                  <Link className="dropdown-item">Something else here</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item">Separated link</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-inline">
              <li className="list-inline-item">
                <i className="fa fa-circle mr-2 text-white"></i>New Visitor
              </li>
              <li className="list-inline-item">
                <i className="fa fa-circle mr-2 text-light"></i>Old Visitor
              </li>
            </ul>
            <div className="chart-container-1">
              <canvas id="chart1"></canvas>
            </div>
          </div>

          <div className="row m-0 row-group text-center border-top border-light-3">
            <div className="col-12 col-lg-4">
              <div className="p-3">
                <h5 className="mb-0">45.87M</h5>
                <small className="mb-0">
                  Overall Visitor{" "}
                  <span>
                    {" "}
                    <i className="fa fa-arrow-up"></i> 2.43%
                  </span>
                </small>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="p-3">
                <h5 className="mb-0">15:48</h5>
                <small className="mb-0">
                  Visitor Duration{" "}
                  <span>
                    {" "}
                    <i className="fa fa-arrow-up"></i> 12.65%
                  </span>
                </small>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="p-3">
                <h5 className="mb-0">245.65</h5>
                <small className="mb-0">
                  Pages/Visit{" "}
                  <span>
                    {" "}
                    <i className="fa fa-arrow-up"></i> 5.62%
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteTraffic;
