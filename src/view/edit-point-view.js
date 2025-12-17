import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate } from '../utils.js';
import { pointTypes } from '../const.js';

function createEventTypesTemplate(types, currentType) {
  function getCheckedTypeAttribute(type) {
    return type === currentType ? 'checked' : '';
  }
  return types.map((type) => `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${getCheckedTypeAttribute(type)}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>`).join('');
}

function createOffersTemplate(offers, point) {
  function getCheckedOfferAttribute(offer) {
    return point.offers.includes(offer.id) ? 'checked' : '';
  }
  return offers.map((offer) =>`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${getCheckedOfferAttribute(offer)}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
}

function createPhotosTemplate(pictures) {
  return pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`).join('');
}

function createEditPointTemplate(point, destination, offers) {
  const { basePrice, dateFrom, dateTo, type } = point;
  const { name, description, pictures } = destination;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypesTemplate(pointTypes, type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DATE_FORMAT.dayMonthYearTime)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DATE_FORMAT.dayMonthYearTime)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${createOffersTemplate(offers, point)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotosTemplate(pictures)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class EditPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = [];
  #handleFormSubmit = null;
  #handleRollUpBtnClick = null;

  constructor({ point, destination, offers, onFormSubmit, onRollUpBtnClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpBtnClick = onRollUpBtnClick;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpBtnClickHandler);
  }

  get template() {
    return createEditPointTemplate(
      this.#point,
      this.#destination,
      this.#offers
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #rollUpBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpBtnClick();
  };
}
