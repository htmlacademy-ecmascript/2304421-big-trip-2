import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import RoutePointItemView from '../view/route-point-item-view.js';
import NewPointView from '../view/new-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new TripEventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortingView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new NewPointView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointItemView(), this.boardComponent.getElement());
    }
  }
}
