import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { sortTypes } from '../const.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';


const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #allPoints = [];
  #currentSort = sortTypes[0].type;
  #pointPresenters = new Map();
  #sortComponent = null;
  #sourсedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#allPoints = [...this.#pointsModel.getPoints()];
    this.#sourсedBoardPoints = [...this.#pointsModel.getPoints()];

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

  #sortPoints(sortType) {
    if (sortType === SortType.DAY) {
      this.#allPoints.sort(sortByDay);
    } else if (sortType === SortType.TIME) {
      this.#allPoints.sort(sortByTime);
    } else if (sortType === SortType.PRICE) {
      this.#allPoints.sort(sortByPrice);
    }
  }

  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#tripEventListComponent.element.innerHTML = '';
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;

    if (sortType === SortType.DAY) {
      this.#allPoints = [...this.#sourсedBoardPoints];
    }

    if (sortType === SortType.TIME) {
      this.#allPoints.sort(sortByTime);
    } else if (sortType === SortType.PRICE) {
      this.#allPoints.sort(sortByPrice);
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
        offers: this.#pointsModel.getOffersByType(point.type)
      });
    });
  }

  #handlePointChange = (updatedPoint) => {
    this.#allPoints = updateItem(this.#allPoints, updatedPoint);
    this.#sourсedBoardPoints = updateItem(this.#sourсedBoardPoints, updatedPoint);

    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#pointsModel.getDestinationById(updatedPoint.destination),
      offers: this.#pointsModel.getOffersByType(updatedPoint.type)
    });
  };
}

