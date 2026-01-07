import PointItemView from '../view/point-item-view.js';
import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor ({ pointListContainer, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, destination, offers, allDestinations, allOffersByType }) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointItemView({
      point,
      destination,
      offers,
      allDestinations,
      allOffersByType,
      onRollDownBtnClick: this.#replacePointItemToForm,
      onFavoriteBtnClick: this.#handleFavoriteBtnClick
    });

    this.#editPointComponent = new EditPointView({
      point,
      destination,
      offers,
      allDestinations,
      allOffersByType,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpBtnClick: this.#replaceFormToPointItem,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
      remove(prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
      remove(prevEditPointComponent);
    }

  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPointItem();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }


  #handleFormSubmit = (point) => {
    this.#mode = Mode.DEFAULT;
    this.#replaceFormToPointItem();
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };


  #replacePointItemToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPointItem = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPointItem();
    }
  };

  #handleFavoriteBtnClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

}
