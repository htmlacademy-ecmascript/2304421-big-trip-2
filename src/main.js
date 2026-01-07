import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, pointsModel, filterModel});
const filterPresenter = new FilterPresenter({filterContainer: filtersElement, filterModel, pointsModel});

filterPresenter.init();
boardPresenter.init();

