import TripInfoView from '../view/trip-info-view.js';
import { render, remove } from '../framework/render.js';
import { getTripRoute, getTripDates, getTripPrice } from '../utils/utils-trip-info.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderTripInfo();
  }

  #handleModelEvent = () => {
    this.#renderTripInfo();
  };

  #renderTripInfo() {
    const points = this.#pointsModel.getPoints();

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (points.length === 0) {
      return;
    }

    const destinations = this.#pointsModel.getDestinations();
    const offersByType = this.#pointsModel.getAllOffers();

    const tripInfo = {
      route: getTripRoute(points, destinations),
      dates: getTripDates(points),
      price: getTripPrice(points, offersByType)
    };

    this.#tripInfoComponent = new TripInfoView(tripInfo);
    render(this.#tripInfoComponent, this.#container, 'afterbegin');
  }
}
