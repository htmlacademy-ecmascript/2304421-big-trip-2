import AbstractView from '../framework/view/abstract-view';
import { filterTypes } from '../const';

function createTripFiltersTemplate(currentFilterType) {
  return filterTypes.map((filterType) => `
    <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType[0].toUpperCase() + filterType.slice(1)}</label>
    </div>`).join('');
}

function createFiltersTemplate(currentFilterType = 'everything') {
  return `<form class="trip-filters" action="#" method="get">
            ${createTripFiltersTemplate(currentFilterType)}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
