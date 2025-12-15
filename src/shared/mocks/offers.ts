import {TCity} from '@/shared/model/offer';

export const cities = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

export const citiesCoords: Record<string, TCity> = {
  'Amsterdam': {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
  'Brussels': {
    name: 'Brussels',
    location: {
      latitude: 50.847767,
      longitude: 4.349394,
      zoom: 13
    }
  },
  'Cologne': {
    name: 'Cologne',
    location: {
      latitude: 50.935994,
      longitude: 6.960506,
      zoom: 13
    }
  },
  'Dusseldorf': {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 13
    }
  },
  'Hamburg': {
    name: 'Hamburg',
    location: {
      latitude: 53.55833,
      longitude: 10.025,
      zoom: 13
    }
  },
  'Paris': {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 13
    }
  }
};
