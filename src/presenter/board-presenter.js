import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import PointItemView from '../view/point-item-view.js';
import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItemView({
      point,
      destination,
      offers,
      onRollDownBtnClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      destination,
      offers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollUpBtnClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#boardComponent.element);
  }
}
