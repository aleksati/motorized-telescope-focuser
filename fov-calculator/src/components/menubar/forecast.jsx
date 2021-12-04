import React, { useCallback, useEffect, useState } from "react";
import loading from "../../img/error-loading/loading.gif";
import error from "../../img/error-loading/error.gif";

// Make so that, if we check at 23:00 (for instace) it get the info from 23:00.. not 21:00..

const Forecast = (props) => {
  const [YRdata, setYRdata] = useState({
    timeseries: {},
    next6h_temp: 0,
    next6h_img: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  // request to use user location through the browser
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            resolve({
              latitude: lat,
              longitude: long,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject("geolocation API not supported :(");
      }
    });
  }

  // We are only interested in one weather forcast at night time.
  const filterData = useCallback((data) => {
    const currTime = Date();
    let currTimeHour = currTime.slice(16, 18);
    let idx;

    // IF its night already, we find the current hour and return it.
    if (currTimeHour >= "21" || currTimeHour <= "03") {
      idx = data.findIndex((item) => {
        return item.time.slice(11, 13) === currTimeHour;
      });
    } else {
      idx = data.findIndex((item) => {
        return item.time.slice(11, 13) === "21";
      });
    }
    return data[idx];
  }, []);

  // Componemt did mount
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const fetchData = async () => {
      try {
        const location = await getLocation();
        const lat = Math.round(location.latitude);
        const long = Math.round(location.longitude);
        const url =
          "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?altitude=0&lat=" +
          lat +
          "&lon=" +
          long;

        const response = await fetch(url);
        const data = await response.json();
        const fdata = filterData(data.properties.timeseries); // remove the timeseries to a single desired object.
        setYRdata((prevState) => ({
          ...prevState,
          timeseries: fdata,
        }));
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchData();
  }, [filterData]);

  // Find the next6hours forecast from 22:00.
  // + image
  useEffect(() => {
    // when the object is empty on load, just return back
    if (Object.keys(YRdata.timeseries).length === 0) {
      return;
    }
    const symbol_code = YRdata.timeseries.data.next_6_hours.summary.symbol_code;
    const temperature = YRdata.timeseries.data.instant.details.air_temperature;
    // "try" to get image from folder based on symbol_code
    try {
      const wimg = require("../../img/weather/" + symbol_code + ".png").default;
      setYRdata((prevState) => ({
        ...prevState,
        next6h_img: wimg,
        next6h_temp: temperature,
      }));
      setIsLoading(false); // loading is complete when we have the image loaded in our state.
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, [YRdata.timeseries]);

  const borderColor = () => {
    let css = "d-flex text-light col-auto border rounded ";
    let bg = props.formswitch ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="form-label-group mb-0 mt-2" key="forecast">
      <p className="text-light mr-2">
        <small>Forecast</small>
      </p>
      {isError ? (
        <p className={borderColor()}>
          <img src={error} alt="ERROR..." width="25px" height="25px" />
        </p>
      ) : isLoading ? (
        <p className={borderColor()}>
          <img src={loading} alt="loading..." width="25px" height="25px" />
        </p>
      ) : (
        <p className={borderColor()}>
          <img
            src={YRdata.next6h_img}
            alt="Specification Drawing"
            width="25px"
            height="25px"
            className="mr-2"
          />
          {YRdata.next6h_temp}°
        </p>
      )}
    </div>
  );
};

export default Forecast;
