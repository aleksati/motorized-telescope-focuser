import React, { useEffect, useState } from "react";

const TheWeatherTonight = (props) => {
  const [weather, setWeather] = useState({
    loading: true,
    timeseries: {},
    next12h: {},
  });

  const getLocationPromise = new Promise((resolve, reject) => {
    // I create a promise for the users geolocation
    // If it is successfull, we can start finding the weather data
    // happens in useEffect.
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
          alert("Okay, but then I cant get the weather for you.. :(");
        }
      );
    } else {
      reject("your browser doesnt support geolocation API :( ..");
    }
  });

  // Fist make sure the user agrees to give their location data.
  // if so, then fetch weather data from the user location from the MET weather API.
  useEffect(() => {
    console.log("hello");
    getLocationPromise.then((location) => {
      let lat = Math.round(location.latitude);
      let long = Math.round(location.longitude);
      let url =
        "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?altitude=0&lat=" +
        lat +
        "&lon=" +
        long;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) =>
          setWeather((weather) => ({
            ...weather,
            loading: false,
            timeseries: data.properties.timeseries,
          }))
        );
    });
  }, []);

  useEffect(() => {
    // Scroll to the time data to find the first 22:00 pm.
    // then store the "next_12_hours" summary_code.
    // I will use this to look up a weather image to display to the user.
    if (Object.keys(weather.timeseries).length !== 0) {
      for (let i = 0; i < weather.timeseries.length; i++) {
        console.log("from the second effect: ", weather.timeseries[i].time);
      }
    }
  }, [weather.timeseries]);

  return (
    <div className="m-2 mt-1">
      {weather.loading ? <h2>Loading...</h2> : <h2>ITEM!</h2>}
    </div>
  );
};

export default TheWeatherTonight;
