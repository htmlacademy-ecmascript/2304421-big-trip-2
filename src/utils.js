import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getDifferenceInTime(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

export { getRandomArrayElement, humanizeTaskDueDate, getDifferenceInTime, getRandomBoolean };
