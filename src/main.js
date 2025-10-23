import NewFilterView from './view/filters.js';
import NewSortingView from './view/sorting.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

render(new NewFilterView(), filtersElement);
render(new NewSortingView(), tripEventsElement);
