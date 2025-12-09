export const POINT_COUNT = 10;
export const pointTypes = [
  'taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'
];
export const filterTypes = [
  'everything', 'future', 'present', 'past'
];

export const sortTypes = [
  { type: 'day', disabled: false },
  { type: 'event', disabled: true },
  { type: 'time', disabled: false },
  { type: 'price', disabled: false },
  { type: 'offers', disabled: true }
];

export const DATE_FORMAT = {
  monthDay: 'MMM D',
  hour: 'HH:mm',
  dayMonthYearTime: 'DD/MM/YY HH:mm'
};
