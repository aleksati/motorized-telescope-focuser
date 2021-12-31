import { PLANETIMAGES, MOONIMAGES } from "./img-data";

const initPlanetData = {
  mercury: {
    string: "mercury",
    img: PLANETIMAGES.mercury,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  venus: {
    string: "venus",
    img: PLANETIMAGES.venus,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  mars: {
    string: "mars",
    img: PLANETIMAGES.mars,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  jupiter: {
    string: "jupiter",
    img: PLANETIMAGES.jupiter,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  saturn: {
    string: "saturn",
    img: PLANETIMAGES.saturn,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  uranus: {
    string: "uranus",
    img: PLANETIMAGES.uranus,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
  neptune: {
    string: "neptune",
    img: PLANETIMAGES.neptune,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
};

const initMoonData = {
  moon: {
    string: "moon",
    img: MOONIMAGES.moon,
    isVisible: false,
    auFromEarth: null,
    kmFromEarth: null,
    angularDiameter: null, // Diameter: 0° 00' 12.065"
    magnitude: null,
  },
};

const initCrowdData = {
  planets: initPlanetData,
  moons: initMoonData,
};

export default initCrowdData;
