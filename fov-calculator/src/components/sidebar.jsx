import React, { Component } from "react";
//import "./sidebar.css";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div
        className="d-flex flex-column p-3 text-white bg-dark m-2"
        style={{ width: 280 }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">FOV calculator</span>
        </a>
        <hr />
        <form>
          <div className="form-label-group m-3">
            <input
              type="number"
              id="apature"
              className="form-control"
              placeholder="Apature (mm)"
              required
              autoFocus
            />
          </div>

          <div className="form-label-group m-3">
            <input
              type="number"
              id="apature"
              className="form-control"
              placeholder="Focal Length (mm)"
              required
              autoFocus
            />
          </div>

          <br />

          <div className="form-label-group m-3">
            <input
              type="number"
              id="apature"
              className="form-control"
              placeholder="Pixel size (microns)"
              width="5"
              required
              autoFocus
            />
          </div>

          <div className="form-label-group m-3">
            <input
              type="number"
              id="apature"
              className="form-control"
              placeholder="Resolution (microns)"
              required
              autoFocus
            />
          </div>
        </form>

        {/* <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <svg className="bi me-2" width="16" height="16"></svg>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"></svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"></svg>
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"></svg>
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"></svg>
              Customers
            </a>
          </li>
        </ul> */}
      </div>
    );
  }
}

export default SideBar;

/* <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Settings</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="something1"
                      id="something1"
                      className="form-control"
                      placeholder="something1"
                      required
                      autoFocus
                    />
                    <label htmlFor="something1">something1</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */
