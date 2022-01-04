import { createTimeOfInterest } from "astronomy-bundle/time";
import { createMoon } from "astronomy-bundle/moon";
import {
  createMars,
  createVenus,
  createMercury,
  createJupiter,
  createSaturn,
  createUranus,
  createNeptune,
} from "astronomy-bundle/planets";

// used in component/chart/chart.jsx
// adds more data to the currCrowd object

// crowdsObj =
// mercury: {
//   string: "mercury",
//   img: PLANETIMAGES.mercury,
//   isVisible: false,
//   auFromEarth: null,
//   kmFromEarth: null,
//   angularDiameter: null, // Diameter: 0° 00' 12.065"
//   magnitude: null,
// },
// ...

const functionMap = {
  mercury: (e) => createMercury(e),
  venus: (e) => createVenus(e),
  mars: (e) => createMars(e),
  jupiter: (e) => createJupiter(e),
  saturn: (e) => createSaturn(e),
  uranus: (e) => createUranus(e),
  neptune: (e) => createNeptune(e),
  moon: (e) => createMoon(e),
};

// returns a promise
export const getSolarSystemData = async (crowdsObj) => {
  let crowdsObjCopy = JSON.parse(JSON.stringify(crowdsObj));
  const date = new Date();
  const toi = createTimeOfInterest.fromDate(date);

  let crowds = Object.keys(crowdsObj);
  for (let i = 0; i < crowds.length; i++) {
    if (crowds[i] !== "planets" && crowds[i] !== "moons") continue;
    let currCrowd = crowdsObj[crowds[i]];
    let currCrowdBodies = Object.keys(currCrowd);
    for (let x = 0; x < currCrowdBodies.length; x++) {
      let currBody = currCrowd[currCrowdBodies[x]];
      let currBodyName = currBody.string;
      //   if (currBodyName !== "mercury") continue; for testing

      let currMethod = functionMap[currBodyName];
      let bodyData = currMethod(toi);

      const km = await bodyData.getDistanceToEarth();
      const au = km * Number(6.6845871222684e-9);
      const aDiameter = await bodyData.getAngularDiameter(); // returns the answer in degrees.
      const mag = await bodyData.getApparentMagnitude();

      // save new data in the copied object.
      crowdsObjCopy[crowds[i]][currCrowdBodies[x]].kmFromEarth = km;
      crowdsObjCopy[crowds[i]][currCrowdBodies[x]].auFromEarth = au;
      crowdsObjCopy[crowds[i]][currCrowdBodies[x]].angularDiameterDeg =
        aDiameter;
      crowdsObjCopy[crowds[i]][currCrowdBodies[x]].magnitude = mag;
    }
  }
  return crowdsObjCopy;
};

// used in component/menubar/forecast.jsx
// request to use user location through the browser
export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          resolve({
            lat: Math.round(latitude),
            long: Math.round(longitude),
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

const GOOGLE_API_KEY;

export async function location2city(lat, long) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat +
    "," +
    long +
    "&key=" +
    GOOGLE_API_KEY;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
