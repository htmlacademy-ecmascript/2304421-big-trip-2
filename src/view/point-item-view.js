import AbstractView from '../framework/view/abstract-view.js';
import { getDifferenceInTime, humanizeTaskDueDate } from '../utils.js';
import { DATE_FORMAT } from '../const.js';

function createOfferTemplate({title, price}) {
  return `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
}

function createPointItemTemplate(point, destination, offers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;
  const name = destination?.name ?? '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${humanizeTaskDueDate(dateFrom, DATE_FORMAT.monthDay)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizeTaskDueDate(dateFrom, DATE_FORMAT.hour)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizeTaskDueDate(dateTo, DATE_FORMAT.hour)}</time>
                  </p>
                  <p class="event__duration">${getDifferenceInTime(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offers.map((offer) => createOfferTemplate(offer)).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class PointItemView extends AbstractView {
  #point = {};
  #destination = null;
  #offers = [];
  #handleRollDownBtnClick = null;
  #handleFavoriteBtnClick = null;

  constructor({ point, destination, offers, onRollDownBtnClick, onFavoriteBtnClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleRollDownBtnClick = onRollDownBtnClick;
    this.#handleFavoriteBtnClick = onFavoriteBtnClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollDownBtnHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteBtnHandler);
  }

  get template() {
    return createPointItemTemplate(this.#point, this.#destination, this.#offers);
  }

  #rollDownBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollDownBtnClick();
  };

  #favoriteBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteBtnClick();
  };
}
