import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import PointItemView from '../view/point-item-view.js';
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

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(
        this.#boardPoints[i],
        this.#pointsModel.getDestinationById(this.#boardPoints[i].destination),
        this.#pointsModel.getOffersByType(this.#boardPoints[i].type)
      );
    }
  }

  #renderPoint(point, destination, offers) {
    const pointComponent = new PointItemView({point, destination, offers});

    render(pointComponent, this.#boardComponent.element);
  }
}
