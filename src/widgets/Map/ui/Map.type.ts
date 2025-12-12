import { City, Points, Point } from '@/shared/model/map';

export interface IMap {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
}
