import AbstractView from '../framework/view/abstract-view';
import { filterTypes } from '../const';

function createTripFiltersTemplate(currentFilterType) {

  function isFilterChecked(filterType) {
    return filterType === currentFilterType ? 'checked' : '';
  }

  function toCapitalLetter(filterType) {
    return filterType[0].toUpperCase() + filterType.slice(1);
  }

  return filterTypes.map((filterType) => `
    <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${isFilterChecked(filterType)}>
      <label class="trip-filters__filter-label" for="filter-${filterType}">${toCapitalLetter(filterType)}</label>
    </div>`).join('');
}

function createFiltersTemplate(currentFilterType = 'everything') {
  return `<form class="trip-filters" action="#" method="get">
            ${createTripFiltersTemplate(currentFilterType)}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter = 'everything') {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter);
  }
}
