import EditPointView from '../view/edit-point-view';
import { render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editPointComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ destination, offers, allDestinations, allOffersByType }) {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      point: this.#createEmptyPoint(destination.id),
      destination,
      offers,
      allDestinations,
      allOffersByType,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpBtnClick: this.destroy,
      onDeleteClick: this.destroy
    });

    render(this.#editPointComponent, this.#pointListContainer, 'afterbegin');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#editPointComponent) {
      remove(this.#editPointComponent);
      this.#editPointComponent = null;
    }

    // remove(this.#editPointComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDestroy();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point
    );

    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #createEmptyPoint(destinationId) {
    return {
      basePrice: 0,
      dateFrom: new Date(),
      dateTo: new Date(),
      destination: destinationId,
      isFavorite: false,
      offers: [],
      type: 'flight'
    };
  }
}
