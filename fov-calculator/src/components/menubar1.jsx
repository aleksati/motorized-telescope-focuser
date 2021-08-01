import React, { Component } from "react";
//import "./sidebar-placeholder-anim.css";

class Menubar1 extends Component {
  state = {
    apature: "",
    flength: "",
    pixelSize: "",
    sensorWidth: "",
    sensorHeight: "",
  };

  handleChange = (event) => {
    // if its 0, we change the value to an empty string
    let value = Number(event.target.value);
    if (value === 0) value = "";
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const FOVdata = this.calculateFOV();
    this.props.onNewUserData(FOVdata);
  };

  render() {
    return (
      //   <nav className="navbar navbar-expand navbar-dark">
      <form className="d-flex" onSubmit={this.handleSubmit}>
        <div className="d-block text-white border border-secondary rounded p-2">
          <h4>Telescope</h4>
          <div className="d-flex">
            <div className="form-label-group">
              <input
                type="number"
                id="apature"
                name="apature"
                onChange={this.handleChange}
                value={this.state.apature}
                placeholder="Apature (mm)"
                className="form-control"
                required
                autoFocus
              />
              <label htmlFor="apature">Apature (mm)</label>
            </div>

            <div className="form-label-group ml-2">
              <input
                type="number"
                id="flength"
                name="flength"
                onChange={this.handleChange}
                value={this.state.flength}
                className="form-control"
                placeholder="Focal Length (mm)"
                required
                autoFocus
              />
              <label htmlFor="flength">Focal Length (mm)</label>
            </div>
          </div>
        </div>

        <div className="d-block text-white border border-secondary rounded p-2 ml-2">
          <h4>Camera Sensor</h4>
          <div className="d-flex">
            <div className="form-label-group">
              <input
                type="number"
                id="pixelSize"
                name="pixelSize"
                onChange={this.handleChange}
                value={this.state.pixelSize}
                className="form-control"
                placeholder="Pixel Size (μm)"
                required
                autoFocus
              />
              <label htmlFor="pixelSize">Pixel Size (μm)</label>
            </div>

            <div className="form-label-group ml-2">
              <input
                type="number"
                id="sensorWidth"
                name="sensorWidth"
                onChange={this.handleChange}
                value={this.state.sensorWidth}
                className="form-control"
                placeholder="Width (px)"
                required
                autoFocus
              />
              <label htmlFor="sensorWidth">Width (px)</label>
            </div>

            <div className="form-label-group ml-2">
              <input
                type="number"
                id="sensorHeight"
                name="sensorHeight"
                onChange={this.handleChange}
                value={this.state.sensorHeight}
                className="form-control"
                placeholder="Heigth (px)"
                required
                autoFocus
              />
              <label htmlFor="sensorHeight">Height (px)</label>
            </div>
          </div>
        </div>

        <div className="d-flex ml-4">
          <button
            type="submit"
            id="goButton"
            className="btn btn-primary btn-lg"
          >
            Setup FOV
          </button>
        </div>
      </form>
    );
  }

  calculateFOV = () => {
    const chipSizeX = (this.state.pixelSize / 1000) * this.state.sensorWidth;
    const chipSizeY = (this.state.pixelSize / 1000) * this.state.sensorHeight;

    const FOV_X = chipSizeX / this.state.flength;
    const FOV_Y = chipSizeY / this.state.flength;

    // if the width is more than 2 degrees, we choose degrees
    if (FOV_X * 57.3 >= 2) {
      return {
        plotSizeX: Math.round(FOV_X * 57.3 * 6),
        plotSizeY: Math.round(FOV_Y * 57.3 * 6),
        plotDivisor: 6,
        chipDim: [this.state.sensorWidth, this.state.sensorHeight],
        axisLabel: "Degrees",
      };
    }

    // if the total size is more than 2 arc minutes, we choose arc minutes.
    if (FOV_X * 3438 >= 2) {
      return {
        plotSizeX: Math.round(FOV_X * 3438 * 6),
        plotSizeY: Math.round(FOV_Y * 3438 * 6),
        plotDivisor: 6,
        chipDim: [this.state.sensorWidth, this.state.sensorHeight],
        axisLabel: "Minutes of Arc",
      };
    }

    // if the total size is more than 2 arc minutes, we choose arc seconds
    return {
      plotSizeX: Math.round(FOV_X * 206265),
      plotSizeY: Math.round(FOV_Y * 206265),
      plotDivisor: 1,
      chipDim: [this.state.sensorWidth, this.state.sensorHeight],
      axisLabel: "Seconds of Arc",
    };
  };
}

export default Menubar1;