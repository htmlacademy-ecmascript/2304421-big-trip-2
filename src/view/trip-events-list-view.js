import { createElement } from '../render.js';

function createEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripEventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

