import dayjs from 'dayjs';

const MS_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function sortByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export const pointFilter = {
  everything: (points) => points,
  future: (points) => points.filter((point) => point.dateFrom > Date.now()),
  present: (points) => points.filter((point) => point.dateFrom <= Date.now() && Date.now() <= point.dateTo),
  past: (points) => points.filter((point) => point.dateTo < Date.now()),
};

export function formatDuration(dateFrom, dateTo) {
  if (!dateFrom || !dateTo) {
    return '';
  }

  const diffMs = dateTo - dateFrom;
  const minutesTotal = Math.floor(diffMs / MS_IN_MINUTE);

  const days = Math.floor(minutesTotal / (MINUTES_IN_HOUR * HOURS_IN_DAY));
  const hours = Math.floor((minutesTotal % (MINUTES_IN_HOUR * HOURS_IN_DAY)) / MINUTES_IN_HOUR);
  const minutes = minutesTotal % MINUTES_IN_HOUR;

  const paddedDays = String(days).padStart(2, '0');
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedDays}D ${paddedHours}H ${paddedMinutes}M`;
}

export { sortByDay, sortByPrice, sortByTime, humanizeTaskDueDate };
