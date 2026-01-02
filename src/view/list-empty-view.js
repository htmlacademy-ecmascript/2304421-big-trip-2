import AbstractView from '../framework/view/abstract-view';
import { NoPointsTextType } from '../const';

function createListEmptyTemplate(currentFilterType) {
  const noPointsTextType = NoPointsTextType[currentFilterType];

  return `<p class="trip-events__msg">${noPointsTextType}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #currentFilterType = null;

  constructor({ currentFilterType }) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createListEmptyTemplate(this.#currentFilterType);
  }
}
