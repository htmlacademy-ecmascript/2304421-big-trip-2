import { getRandomArrayElement } from '../utils';
import { getRandomBoolean } from '../utils';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-1',
    basePrice: 1100,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-2',
    basePrice: 1200,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa34'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-3',
    basePrice: 1300,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa36'
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-4',
    basePrice: 900,
    dateFrom: '2025-12-13T22:55:56.845Z',
    dateTo: '2025-12-14T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa38'
    ],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-5',
    basePrice: 500,
    dateFrom: '2025-12-14T22:55:56.845Z',
    dateTo: '2025-12-15T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa40',
      'b4c3e4e6-9053-42ce-b747-e281314baa41'
    ],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-6',
    basePrice: 1500,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa45',
      'b4c3e4e6-9053-42ce-b747-e281314baa46',
      'b4c3e4e6-9053-42ce-b747-e281314baa47'
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-7',
    basePrice: 1000,
    dateFrom: '2025-12-05T22:55:56.845Z',
    dateTo: '2025-12-06T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e07',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa49'
    ],
    type: 'check-in'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-8',
    basePrice: 1300,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e08',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa52'
    ],
    type: 'sightseeing'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-9',
    basePrice: 2000,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e09',
    isFavorite: getRandomBoolean(),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa54'
    ],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };

