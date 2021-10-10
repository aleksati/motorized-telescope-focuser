import React, { useEffect, useState } from "react";

// combine next12h and YRdata. Like this:
// timeseries:
// next12h_symbol_imgpath:
// temp:

// make the layout a bit better.
// then we're done.
// test is the HTTP req fails.

const TheWeatherTonight = (props) => {
  const [YRdata, setYRdata] = useState({});
  const [next12h, setNext12h] = useState({
    temp: 0,
    img: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

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
            // this happens everytime?!? even though the useEffect is not fired.
            reject(error);
          }
        );
      } else {
        reject("your browser doesnt support geolocation API :( ..");
      }
    });
  }

  // filter the YRdata. We are only interested in one weather forcast at night time.
  // if its night already, just return the first one.
  const filterData = (data) => {
    for (let i = 0; i < data.length; i++) {
      let currTime = data[i].time.slice(11, 13);
      if (currTime >= "22" || currTime <= "03") {
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
        const fdata = filterData(data.properties.timeseries); // remove the timeseries to one object.
        setYRdata(fdata);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchData();
  }, []);

  // Find the next12hours forecast from 22:00.
  // + image
  useEffect(() => {
    if (Object.keys(YRdata).length === 0) {
      return;
    }
    const symbol_code = YRdata.data.next_12_hours.summary.symbol_code;
    const temperature = YRdata.data.instant.details.air_temperature;
    // "try" to get image from folder based on symbol_code
    try {
      const wimg = require("../img/weather/" + symbol_code + ".png").default;
      setNext12h({
        img: wimg,
        temp: temperature,
      });
      setIsLoading(false); // loading is complete when we have the image loaded in our state.
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, [YRdata]);

  return (
    <div className="m-2 mt-1">
      {isError ? (
        <p>
          <small>Something went wrong here...</small>
        </p>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="d-flex">
          <img
            src={next12h.img}
            alt="Specification Drawing"
            width="40px"
            height="40px"
          />
          <p className="m-2">{next12h.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default TheWeatherTonight;
