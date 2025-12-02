import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import PointItemView from '../view/point-item-view.js';
import NewPointView from '../view/new-point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #boardComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = null;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.getPoints()];

    render(new SortingView(), this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);
    render(new NewPointView({
      point: this.#boardPoints[0],
      destination: this.#pointsModel.getDestinationById(this.#boardPoints[0].destination),
      offers: this.#pointsModel.getOffersByType(this.#boardPoints[0].type)
    }), this.#boardComponent.element);

    for (let i = 1; i < this.#boardPoints.length; i++) {
      render(new PointItemView({
        point: this.#boardPoints[i],
        destination: this.#pointsModel.getDestinationById(this.#boardPoints[i].destination),
        offers: this.#pointsModel.getOffersByType(this.#boardPoints[i].type)}), this.#boardComponent.element);
    }
  }
}
