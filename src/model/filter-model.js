import Observable from '../framework/observable.js';
import { filterTypes } from '../const.js';
import { pointFilter } from '../utils/utils.js';

export default class FilterModel extends Observable {
  #filter = filterTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

  getFilters(points) {
    return Object.values(filterTypes).map((filterType) => ({
      type: filterType,
      count: pointFilter[filterType](points).length
    }));
  }
}
