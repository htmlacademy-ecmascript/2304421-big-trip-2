import AbstractView from '../framework/view/abstract-view';
import { sortTypes } from '../const';

function createTripSortTemplate(currentSort) {

  function isChecked(type) {
    return type === currentSort ? 'checked' : '';
  }

  function isDisabled(disabled) {
    return disabled ? 'disabled' : '';
  }

  function toCapitalLetter(type) {
    return type[0].toUpperCase() + type.slice(1);
  }

  return sortTypes.map(({ type, disabled }) =>
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${type}" ${isChecked(type)} ${isDisabled(disabled)}>
      <label class="trip-sort__btn" for="sort-${type}">${toCapitalLetter(type)}</label>
    </div>`).join('');
}

function createSortingViewTemplate(currentSort) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createTripSortTemplate(currentSort)}
          </form>`;
}

export default class SortingView extends AbstractView {
  #currentSort = null;

  constructor(currentSort = sortTypes[0].type) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSortingViewTemplate(this.#currentSort);
  }
}

