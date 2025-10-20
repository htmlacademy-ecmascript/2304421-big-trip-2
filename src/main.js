import NewFilterView from './view/filters.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new NewFilterView(), filtersElement);
