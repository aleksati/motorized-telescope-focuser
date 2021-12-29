import { PLANETIMAGES } from "../img/planets/planetimages";
import { MOONIMAGES } from "../img/moons/moonimages";

export const initPlanetData = {
  mercury: {
    string: "mercury",
    img: PLANETIMAGES.mercury,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  venus: {
    string: "venus",
    img: PLANETIMAGES.venus,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  mars: {
    string: "mars",
    img: PLANETIMAGES.mars,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  jupiter: {
    string: "jupiter",
    img: PLANETIMAGES.jupiter,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  saturn: {
    string: "saturn",
    img: PLANETIMAGES.saturn,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  uranus: {
    string: "uranus",
    img: PLANETIMAGES.uranus,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
  neptune: {
    string: "neptune",
    img: PLANETIMAGES.neptune,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
};

export const initMoonData = {
  moon: {
    string: "moon",
    img: MOONIMAGES.moon,
    isVisible: false,
    AU: 0,
    kmDiameter: 0,
  },
};

export const selectedX = require("../img/body-selection/selectedx.png").default;
