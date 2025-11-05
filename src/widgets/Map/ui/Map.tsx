import {FC, useEffect, useRef} from 'react';
import useMap from '../hooks/useMap.ts';
import {Icon, Marker, layerGroup} from 'leaflet';
import { City, Points, Point } from '../types';
import { URL_MARKER_DEFAULT } from '../constants/urls';
import 'leaflet/dist/leaflet.css';

interface IMap {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40]
// });

const Map: FC<IMap> = (props) => {

  const { points, selectedPoint, city } = props;
  const containerRef = useRef(null);
  const map = useMap(containerRef, city);

  useEffect(() => {
    if (map.current) {
      const markerLayer = layerGroup().addTo(map.current);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          // .setIcon(
          //   selectedPoint !== undefined && point.title === selectedPoint.title
          //     ? currentCustomIcon
          //     : defaultCustomIcon
          // )
          .setIcon(defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.current?.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      ref={containerRef}
      className="cities__map"
      style={{height: '100%', width: '100%'}}
    />
  );
};

export default Map;
