import FilterView from './view/filters-view.js';
import NewDestinationView from './view/new-destination-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new FilterView(), filtersElement);
render(new NewDestinationView(), tripMainElement, 'afterbegin');

boardPresenter.init();
