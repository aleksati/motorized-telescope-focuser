import React, { useEffect, useState } from "react";

// test is the HTTP req fails.
// ADD loading gif
// Make so that, if we check at 23:00 (for instace) it get the info from 23:00.. not 21:00..

const TheWeatherTonight = (props) => {
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

  // filter the YRdata. We are only interested in one weather forcast at night time.
  // if its night already, just return the first one.
  const filterData = (data) => {
    for (let i = 0; i < data.length; i++) {
      let currTime = data[i].time.slice(11, 13);
      if (currTime >= "21" || currTime <= "03") {
        return data[i];
      }
    }
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
    <div className="m-2 mt-1">
      {isError ? (
        <p>
          <small>Something went wrong here...</small>
        </p>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="d-flex justify-content-between text-light">
          <img
            src={YRdata.next6h_img}
            alt="Specification Drawing"
            width="50px"
            height="50px"
          />
          <h5 className=" mt-3 ml-2">{YRdata.next6h_temp}°C</h5>
        </div>
      )}
    </div>
  );
};

export default TheWeatherTonight;
