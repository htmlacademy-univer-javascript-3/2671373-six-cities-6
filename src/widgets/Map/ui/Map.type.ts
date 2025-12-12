import {TCity, TLocation} from '@/shared/model/offer';

export interface IMap {
  city: TCity;
  points: TLocation[];
  selectedPoint: TLocation | undefined;
  setSelectedPoint: (selectedPoint: TLocation | undefined) => void;
}
