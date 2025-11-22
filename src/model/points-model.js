import { getRandomPoint } from '../mock/points.js';
import { getDestinations } from '../mock/destinations.js';
import { getOffers } from '../mock/offers.js';
import { POINT_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  destinations = getDestinations();
  offers = getOffers();

  getPoints() {
    return this.points;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    const offerSet = this.offers.find((offer) => offer.type === type);
    return offerSet ? offerSet.offers : [];
  }
}
