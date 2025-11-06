import { City, Points, Point } from '../types';

export interface IMap {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
}
