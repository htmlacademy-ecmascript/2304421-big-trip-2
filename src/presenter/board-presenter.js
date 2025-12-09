import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import PointItemView from '../view/point-item-view.js';
import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { sortTypes } from '../const.js';

const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #allPoints = [];
  #currentSort = sortTypes[0].type;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#allPoints = [...this.#pointsModel.getPoints()];

    if(this.#allPoints.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new TripInfoView(), tripMainElement, 'afterbegin');
    this.#renderAllPoints();
  }

  #renderPoint(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPointItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItemView({
      point,
      destination,
      offers,
      onRollDownBtnClick: () => {
        replacePointItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      destination,
      offers,
      onFormSubmit: () => {
        replaceFormToPointItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollUpBtnClick: () => {
        replaceFormToPointItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointItemToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPointItem() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#tripEventListComponent.element);
  }

  #renderAllPoints() {
    render(new SortingView(this.#currentSort), this.#boardContainer);
    render(this.#tripEventListComponent, this.#boardContainer);

    this.#allPoints.forEach((point) => {
      this.#renderPoint(
        point,
        this.#pointsModel.getDestinationById(point.destination),
        this.#pointsModel.getOffersByType(point.type)
      );
    });
  }
}
