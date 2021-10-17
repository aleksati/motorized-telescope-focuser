import React, { useEffect, useState } from "react";
import loading from "../img/error-loading/loading.gif";
import error from "../img/error-loading/error.gif";

// Make so that, if we check at 23:00 (for instace) it get the info from 23:00.. not 21:00..

const TheWeatherTonight = (props) => {
  const [YRdata, setYRdata] = useState({
    timeseries: {},
    next6h_temp: 0,
    next6h_img: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const currTime = Date();

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
  const filterData = (data) => {
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
  };

  // Coponenmt did mount
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
  }, []);

  // Find the next6hours forecast from 22:00.
  // + image
  useEffect(() => {
    if (Object.keys(YRdata.timeseries).length === 0) {
      return;
    }
    const symbol_code = YRdata.timeseries.data.next_6_hours.summary.symbol_code;
    const temperature = YRdata.timeseries.data.instant.details.air_temperature;
    // "try" to get image from folder based on symbol_code
    try {
      const wimg = require("../img/weather/" + symbol_code + ".png").default;
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

  return (
    <div>
      {isError ? (
        <div className="d-flex justify-content-center mt-2">
          <img src={error} alt="ERROR..." width="50px" height="50px" />
        </div>
      ) : isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <img src={loading} alt="loading..." width="40px" height="40px" />
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-1 text-light">
          <img
            src={YRdata.next6h_img}
            alt="Specification Drawing"
            width="50px"
            height="50px"
          />
          <h5 className=" mt-3 ml-3">{YRdata.next6h_temp}°C</h5>
        </div>
      )}
    </div>
  );
};

export default TheWeatherTonight;
