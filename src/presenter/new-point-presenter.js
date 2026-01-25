import EditPointView from '../view/edit-point-view';
import { render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editPointComponent = null;
  #allOffersByType = null;

  constructor({ pointListContainer, onDataChange, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ destination, allDestinations, allOffersByType }) {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#allOffersByType = allOffersByType;

    this.#editPointComponent = new EditPointView({
      point: this.#createEmptyPoint(destination?.id ?? ''),
      destination: destination ?? { name: '', description: '', picture: [] },
      offers: this.#getOffersForType('flight'),
      allDestinations,
      allOffersByType,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpBtnClick: this.destroy,
      onDeleteClick: this.destroy
    });

    render(this.#editPointComponent, this.#pointListContainer, 'afterbegin');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #getOffersForType(type) {
    const offersByType = this.#allOffersByType.find((offer) => offer.type === type);
    return offersByType ? offersByType.offers : [];
  }


  destroy = () => {
    if (!this.#editPointComponent) {
      return;
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#editPointComponent);
    this.#editPointComponent = null;
    this.#handleDestroy();
  };

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point
    );
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
      dateFrom: null,
      dateTo: null,
      destination: destinationId,
      isFavorite: false,
      offers: [],
      type: 'flight'
    };
  }
}
