import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-1',
    basePrice: 1100,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    isFavorite: false,
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
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa32'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c-3',
    basePrice: 1300,
    dateFrom: '2025-12-11T22:55:56.845Z',
    dateTo: '2025-12-13T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: 'train'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };

