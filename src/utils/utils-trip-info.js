import dayjs from 'dayjs';

export const getTripRoute = (points, destinations) => {
  if (points.length === 0) {
    return '';
  }

  const sortedPoints = [...points].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  const cities = sortedPoints.map((point) => destinations.find((dest) => dest.id === point.destination).name);

  const uniqueCities = cities.filter((city, index) => city && city !== cities[index - 1]);


  if (uniqueCities.length > 3) {
    return `${uniqueCities[0]} — ... — ${uniqueCities[uniqueCities.length - 1]}`;
  }

  return uniqueCities.join(' — ');
};

export const getTripDates = (points) => {
  if (points.length === 0) {
    return '';
  }

  const sortedPoints = [...points].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  const startDate = dayjs(sortedPoints[0].dateFrom).format('D MMM').toUpperCase();
  const endDate = dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format('D MMM').toUpperCase();

  return `${startDate} - ${endDate}`;
};

export const getTripPrice = (points, offersByType) => points.reduce((total, point) => {

  let pointPrice = point.basePrice;

  const availableOffers = offersByType[point.type] || [];

  point.offers.forEach((offerId) => {
    const offer = availableOffers.find((item) => item.id === offerId);
    if (offer) {
      pointPrice += offer.price;
    }
  });

  return total + pointPrice;
}, 0);
