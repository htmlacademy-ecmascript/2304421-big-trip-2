const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Add luggage',
        price: 50
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Add meal',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa34',
        title: 'Order Uber',
        price: 20
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa35',
        title: 'Switch to business class',
        price: 100
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa36',
        title: 'Rent a car',
        price: 70
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa37',
        title: 'Add breakfast',
        price: 30
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa38',
        title: 'Book tickets',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa39',
        title: 'Lunch in city',
        price: 30
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa40',
        title: 'Child seat',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa41',
        title: 'Reserved seat',
        price: 20
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa42',
        title: 'Extra luggage',
        price: 25
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa43',
        title: 'Comfort class',
        price: 45
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa44',
        title: 'Meal included',
        price: 15
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa45',
        title: 'Checked baggage',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa46',
        title: 'Extra legroom',
        price: 105
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa47',
        title: 'Priority boarding',
        price: 155
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa48',
        title: 'Change beverages',
        price: 180
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa49',
        title: 'Late check-out',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa50',
        title: 'Early check-in',
        price: 15
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa51',
        title: 'Night ckeck-in',
        price: 5
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa52',
        title: 'Skip-the-line ticket',
        price: 180
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa53',
        title: 'Private guide',
        price: 90
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa54',
        title: 'Premium menu',
        price: 100
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa55',
        title: 'Wine pairing',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa56',
        title: 'Early breakfast',
        price: 15
      }
    ]
  }
];

export function getOffers() {
  return mockOffers;
}
