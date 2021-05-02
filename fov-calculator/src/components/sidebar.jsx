import React, { Component } from "react";
import "./sidebar-placeholder-anim.css";

class SideBar extends Component {
  state = {
    apature: "",
    flength: "",
    chipSize: "",
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
    this.props.onSubmit(this.state);
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
                id="chipSize"
                name="chipSize"
                onChange={this.handleChange}
                value={this.state.chipSize}
                className="form-control"
                placeholder="Chip Size (mm)"
                required
                autoFocus
              />
              <label htmlFor="chipSize">Chip Size (mm)</label>
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
}

export default SideBar;

//   <div className="flex-column p-3 text-white bg-transparent m-2 border border-secondary rounded">
//     <form>
//       <h2>Telescope</h2>
//       <div className="form-label-group mb-3">
//         <input
//           type="number"
//           id="telescopeApature"
//           className="form-control"
//           placeholder="Apature (mm)"
//           required
//           autoFocus
//         />
//         <label htmlFor="telescopeApature">Apature (mm)</label>
//       </div>

//       <div className="form-label-group mb-3">
//         <input
//           type="number"
//           id="telescopeFL"
//           className="form-control"
//           placeholder="Focal Length (mm)"
//           required
//           autoFocus
//         />
//         <label htmlFor="telescopeFL">Focal Length (mm)</label>
//       </div>

//       <h2>Camera Sensor</h2>

//       <div className="form-label-group mb-3">
//         <input
//           type="number"
//           id="cameraSensorSize"
//           className="form-control"
//           placeholder="Pixel Size (microns)"
//           required
//           autoFocus
//         />
//         <label htmlFor="cameraSensorSize">Pixel Size (microns)</label>
//       </div>

//       <div className="d-flex justify-content-center align-items-center">
//         <div className="form-label-group">
//           <input
//             type="number"
//             id="cameraSensorWidth"
//             className="form-control"
//             placeholder="Width (px)"
//             required
//             autoFocus
//           />
//           <label htmlFor="cameraSensorWidth"> Width (px)</label>
//         </div>

//         <div className="form-label-group ml-2">
//           <input
//             type="number"
//             id="cameraSensorHeight"
//             className="form-control"
//             placeholder="Heigth (px)"
//             required
//             autoFocus
//           />
//           <label htmlFor="cameraSensorHeight">Height (px)</label>
//         </div>
//       </div>

//       <button type="button" id="goButton" className="btn btn-primary">
//         Setup Plot
//       </button>
//     </form>
//   </div>
