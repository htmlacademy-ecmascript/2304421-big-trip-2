import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, filterTypes } from '../const.js';
import { sortByDay, sortByPrice, sortByTime, pointFilter } from '../utils/utils.js';
import { remove } from '../framework/render.js';
import NewPointPresenter from './new-point-presenter.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #loadingComponent = new LoadingView();
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
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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
    render(this.#tripEventListComponent, this.#boardContainer);
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
        this.#newPointPresenter.destroy();
        this.#renderSort();
        this.#renderAllPoints();
        break;

      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearBoard();
        render(this.#tripEventListComponent, this.#boardContainer);

        if (this.points.length > 0) {
          this.#renderSort();
        }

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

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, 'afterbegin');
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    this.#tripEventListComponent.element.innerHTML = '';
    remove(this.#loadingComponent);
    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      this.#noPointComponent = null;
    }
  }


  #renderAllPoints() {
    render(this.#tripEventListComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

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

