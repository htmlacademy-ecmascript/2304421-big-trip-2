import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import { POINT_COUNT, SortType, UpdateType, UserAction, filterTypes } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';
import { remove } from '../framework/render.js';
import { pointFilter } from '../utils.js';


const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();
  #sortComponent = null;
  #filterModel = null;

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.getPoints();
    const filteredPoints = pointFilter[filterType](points);

    switch (this.#currentSort) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);

      case SortType.TIME:
        return filteredPoints.sort(sortByTime);

      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init() {

    if(this.#pointsModel.getPoints().length === 0) {
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;

      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init({
          point: data,
          destination: this.#pointsModel.getDestinationById(data.destination),
          offers: this.#pointsModel.getOffersByType(data.type),
          allDestinations: this.#pointsModel.getDestinations(),
          allOffersByType: this.#pointsModel.getAllOffers()
        });
        break;


      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderAllPoints();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderAllPoints();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;

    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderAllPoints();
  };

  #renderSort() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortingView(this.#currentSort, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer);
  }

  #clearBoard({resetRenderedPointCount = false, resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }
  }


  #renderAllPoints() {

    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter ({
        pointListContainer: this.#tripEventListComponent.element,
        onDataChange: this.#handleViewAction,
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

    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#pointsModel.getDestinationById(updatedPoint.destination),
      offers: this.#pointsModel.getOffersByType(updatedPoint.type),
      allDestinations: this.#pointsModel.getDestinations(),
      allOffersByType: this.#pointsModel.getAllOffers()
    });
  };
}

