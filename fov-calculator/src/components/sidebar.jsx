import React, { Component } from "react";
import "./sidebar-placeholder-anim.css";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div className=" w-25 d-flex flex-column p-3 text-white bg-transparent m-2 border border-secondary rounded">
        <form>
          <h2>Telescope</h2>
          <div className="form-label-group mb-3">
            <input
              type="number"
              id="telescopeApature"
              className="form-control"
              placeholder="Apature (mm)"
              required
              autoFocus
            />
            <label htmlFor="telescopeApature">Apature (mm)</label>
          </div>

          <div className="form-label-group mb-3">
            <input
              type="number"
              id="telescopeFL"
              className="form-control"
              placeholder="Focal Length (mm)"
              required
              autoFocus
            />
            <label htmlFor="telescopeFL">Focal Length (mm)</label>
          </div>

          <h2>Camera Sensor</h2>

          <div className="form-label-group mb-3">
            <input
              type="number"
              id="cameraSensorSize"
              className="form-control"
              placeholder="Pixel Size (microns)"
              required
              autoFocus
            />
            <label htmlFor="cameraSensorSize">Pixel Size (microns)</label>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <div className="form-label-group">
              <input
                type="number"
                id="cameraSensorWidth"
                className="form-control"
                placeholder="Width (px)"
                required
                autoFocus
              />
              <label htmlFor="cameraSensorWidth"> Width (px)</label>
            </div>

            <div className="form-label-group ml-2">
              <input
                type="number"
                id="cameraSensorHeight"
                className="form-control"
                placeholder="Heigth (px)"
                required
                autoFocus
              />
              <label htmlFor="cameraSensorHeight">Height (px)</label>
            </div>
          </div>

          <button type="button" id="goButton" className="btn btn-primary">
            Setup Plot
          </button>
        </form>
      </div>
    );
  }
}

export default SideBar;
