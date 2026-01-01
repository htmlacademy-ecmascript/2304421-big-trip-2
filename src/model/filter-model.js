import Observable from '../framework/observable.js';
import { filterTypes } from '../const.js';

export default class FilterModel extends Observable {
  #filter = filterTypes.everything;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
