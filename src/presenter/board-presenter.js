import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { SortType } from '../const.js';
import { sortByPrice, sortByTime } from '../utils.js';


const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #allPoints = [];
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();
  #sortComponent = null;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#allPoints = [...this.#pointsModel.getPoints()];
    this.#sourcedBoardPoints = [...this.#pointsModel.getPoints()];

    if(this.#allPoints.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new TripInfoView(), tripMainElement, 'afterbegin');
    this.#renderSort();
    render(this.#tripEventListComponent, this.#boardContainer);
    this.#renderAllPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;

    switch (sortType) {
      case SortType.DAY:
        this.#allPoints = [...this.#sourcedBoardPoints];
        break;

      case SortType.TIME:
        this.#allPoints = [...this.#sourcedBoardPoints].sort(sortByTime);
        break;

      case SortType.PRICE:
        this.#allPoints = [...this.#sourcedBoardPoints].sort(sortByPrice);
        break;
    }

    this.#clearBoard();
    this.#renderAllPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortingView(this.#currentSort, {onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderAllPoints() {

    this.#allPoints.forEach((point) => {
      const pointPresenter = new PointPresenter ({
        pointListContainer: this.#tripEventListComponent.element,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange
      });

      this.#pointPresenters.set(point.id, pointPresenter);

      pointPresenter.init({
        point,
        destination: this.#pointsModel.getDestinationById(point.destination),
        offers: this.#pointsModel.getOffersByType(point.type),
        allDestinations: this.#pointsModel.getDestinations(),
        allOffersByType: this.#pointsModel.getAllOffers()
      });
    });
  }

  #handlePointChange = (updatedPoint) => {
    this.#allPoints = updateItem(this.#allPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#pointsModel.getDestinationById(updatedPoint.destination),
      offers: this.#pointsModel.getOffersByType(updatedPoint.type),
      allDestinations: this.#pointsModel.getDestinations(),
      allOffersByType: this.#pointsModel.getAllOffers()
    });
  };
}

