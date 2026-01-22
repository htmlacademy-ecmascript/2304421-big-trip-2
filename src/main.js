import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import TripPresenter from './presenter/trip-presenter.js';

const AUTHORIZATION = 'Basic hSS2sfS44wcl1sa21';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const tripInfoPresenter = new TripPresenter({ container: tripMainElement, pointsModel });
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, pointsModel, filterModel});
const filterPresenter = new FilterPresenter({filterContainer: filtersElement, filterModel, pointsModel});

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();
pointsModel.init();

