// used in component/menubar/forecast.jsx
// request to use user location through the browser

const getUserLocation = async () => {
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
};

export default getUserLocation;
