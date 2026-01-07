export const POINT_COUNT = 4;
export const pointTypes = [
  'taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'
];
export const filterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};


export const NoPointsTextType = {
  everything: 'Click New Event to create your first point',
  future: 'There are no points about the future',
  present: 'There are no points about the present',
  past: 'There are no points about the past'
};

export const sortTypes = [
  { type: 'day', disabled: false },
  { type: 'event', disabled: true },
  { type: 'time', disabled: false },
  { type: 'price', disabled: false },
  { type: 'offers', disabled: true }
];

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export const DATE_FORMAT = {
  monthDay: 'MMM D',
  hour: 'HH:mm',
  dayMonthYearTime: 'DD/MM/YY HH:mm'
};

export const defaultDatepickerOptions = {
  enableTime: true,
  dateFormat: 'd.m.Y H:i',
  locale: {firstDayOfWeek: 1},
  'time_24hr': true
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

