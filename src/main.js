import NewFilterView from './view/filters.js';
import NewSortingView from './view/sorting.js';
import NewPointView from './view/route-point.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

render(new NewFilterView(), filtersElement);
render(new NewSortingView(), tripEventsElement);
render(new NewPointView(), tripMainElement, 'afterbegin');
