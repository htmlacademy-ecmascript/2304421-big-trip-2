import PointItemView from '../view/point-item-view.js';
import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';

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

  init({ point, destination, offers }) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointItemView({
      point,
      destination,
      offers,
      onRollDownBtnClick: this.#replacePointItemToForm,
      onFavoriteBtnClick: this.#handleFavoriteBtnClick
    });

    this.#editPointComponent = new EditPointView({
      point,
      destination,
      offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpBtnClick: this.#replaceFormToPointItem
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
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

  #handleFormSubmit = (updatedPoint) => {
    this.#handleDataChange(updatedPoint);
    // this.#mode = Mode.DEFAULT;
    this.#replaceFormToPointItem();
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
    this.#handleDataChange({
      ...this.#point, isFavorite: !this.#point.isFavorite
    });
  };
}
