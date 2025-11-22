import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import RoutePointItemView from '../view/point-item-view.js';
import NewPointView from '../view/new-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new TripEventsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortingView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new NewPointView({
      point: this.boardPoints[0],
      destination: this.pointsModel.getDestinationById(this.boardPoints[0].destination),
      offers: this.pointsModel.getOffersByType(this.boardPoints[0].type)
    }), this.boardComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new RoutePointItemView({
        point: this.boardPoints[i],
        destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination),
        offers: this.pointsModel.getOffersByType(this.boardPoints[i].type)}), this.boardComponent.getElement());
    }
  }
}
