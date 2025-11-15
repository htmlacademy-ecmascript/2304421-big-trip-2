import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import RoutePointItemView from '../view/route-point-item-view.js';
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
    render(new NewPointView(), this.boardComponent.getElement());

    for (let i = 0; i < this.boardPoints.lenght; i++) {
      render(new RoutePointItemView({point: this.boardPoints[i]}), this.boardComponent.getElement());
    }
  }
}
