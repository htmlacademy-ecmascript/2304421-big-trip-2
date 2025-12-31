import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getDifferenceInTime(dateFrom, dateTo) {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(diffInMinutes / (24 * 60));
  const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
  const minutes = diffInMinutes % 60;
  return `${days > 0 ? `${days}D ` : ''}${hours}H ${minutes}M`;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


function getRandomBoolean() {
  return Math.random() < 0.5;
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

export { sortByDay, sortByPrice, sortByTime, getRandomArrayElement, humanizeTaskDueDate, getDifferenceInTime, getRandomBoolean, updateItem };
