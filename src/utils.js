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


function getRandomBoolean() {
  return Math.random() < 0.5;
}

export { getRandomArrayElement, humanizeTaskDueDate, getDifferenceInTime, getRandomBoolean };
