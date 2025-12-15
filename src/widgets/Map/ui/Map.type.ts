import {TCity, TLocation} from '@/shared/model/offer';

export type TMapPoint = {
  id: string;
  location: TLocation;
}

export interface IMap {
  city: TCity;
  points: TMapPoint[];
  selectedPoint?: TMapPoint;
}
