import { getRandomPoint } from './mock/points';
// import { mockDestinations } from './mock/destinations';
// import { mockOffers } from './mock/offers';
import { POINT_COUNT } from './const';

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
