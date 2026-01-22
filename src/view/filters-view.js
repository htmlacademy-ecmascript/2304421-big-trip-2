import AbstractView from '../framework/view/abstract-view';

function createTripFiltersTemplate(filters, currentFilterType) {

  function isFilterChecked(filterType) {
    return filterType === currentFilterType ? 'checked' : '';
  }

  function isFilterDisabled(count) {
    return count === 0 ? 'disabled' : '';
  }

  function toCapitalLetter(filterType) {
    return filterType[0].toUpperCase() + filterType.slice(1);
  }

  return filters.map(({type, count}) => `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isFilterChecked(type)} ${isFilterDisabled(count)}>
      <label class="trip-filters__filter-label" for="filter-${type}">${toCapitalLetter(type)}</label>
    </div>`).join('');
}

function createFiltersTemplate(filters, currentFilterType) {
  return `<form class="trip-filters" action="#" method="get">
            ${createTripFiltersTemplate(filters, currentFilterType)}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView {
  #currentFilter = null;
  #handleFilterChange = null;
  #filters = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    if (evt.target.name !== 'trip-filter') {
      return;
    }
    this.#handleFilterChange(evt.target.value);
  };
}
