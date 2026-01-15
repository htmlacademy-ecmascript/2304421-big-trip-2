import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, filterTypes } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';
import { remove } from '../framework/render.js';
import { pointFilter } from '../utils.js';
import NewPointPresenter from './new-point-presenter.js';
import NewPointButtonView from '../view/new-point-button-view.js';


const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();
  #sortComponent = null;
  #filterModel = null;
  #noPointComponent = null;
  #filterType = filterTypes.EVERYTHING;
  #newPointPresenter = null;
  #newPointButton = null;

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.getPoints();
    const filteredPoints = pointFilter[this.#filterType](points);

    switch (this.#currentSort) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortByDay);

      case SortType.TIME:
        return [...filteredPoints].sort(sortByTime);

      case SortType.PRICE:
        return [...filteredPoints].sort(sortByPrice);
    }
    return filteredPoints;
  }

  init() {

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy
    });

    this.#newPointButton = new NewPointButtonView({
      onClick: this.#handleNewPointClick
    });

    render(this.#newPointButton, tripMainElement);
    render(new TripInfoView(), tripMainElement, 'afterbegin');
    this.#renderSort();
    render(this.#tripEventListComponent, this.#boardContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderAllPoints();
  }

  #handleNewPointClick = () => {
    this.#handleModeChange();
    this.#filterModel.setFilter(UpdateType.MINOR, filterTypes.EVERYTHING);
    this.#currentSort = SortType.DAY;
    this.#newPointButton.setDisabled();
    this.#newPointPresenter.init({
      destination: this.#pointsModel.getDestinations()[0],
      offers: [],
      allDestinations: this.#pointsModel.getDestinations(),
      allOffersByType: this.#pointsModel.getAllOffers()
    });
  };

  #handleNewPointDestroy = () => {
    this.#newPointButton.setEnabled();
  };

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
        this.#renderSort();
        this.#renderAllPoints();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderSort();
        this.#renderAllPoints();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;

    this.#clearBoard();
    this.#renderSort();
    this.#renderAllPoints();
  };

  #renderNoPoints() {
    this.#noPointComponent = new ListEmptyView({
      currentFilterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderSort() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortingView(this.#currentSort, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer, 'afterbegin');
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    this.#tripEventListComponent.element.innerHTML = '';

    // remove(this.#sortComponent);
    // remove(this.#tripEventListComponent);

    // this.#tripEventListComponent = new TripEventsListView();

    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      this.#noPointComponent = null;
    }
  }


  #renderAllPoints() {
    if(this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

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
}

