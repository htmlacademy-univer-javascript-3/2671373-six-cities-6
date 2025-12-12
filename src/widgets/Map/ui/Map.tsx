import {FC, useEffect, useRef} from 'react';
import {useMap} from '../hooks';
import {Marker, layerGroup} from 'leaflet';
import { defaultCustomIcon } from '../constants/icons';
import 'leaflet/dist/leaflet.css';
import {IMap} from './Map.type.ts';

const Map: FC<IMap> = (props) => {

  const { points, selectedPoint, city, setSelectedPoint } = props;
  const containerRef = useRef(null);
  const map = useMap(containerRef, city);

  useEffect(() => {
    if (map.current) {
      const markerLayer = layerGroup().addTo(map.current);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          // .setIcon(
          //   selectedPoint !== undefined && point.title === selectedPoint.title
          //     ? currentCustomIcon
          //     : defaultCustomIcon
          // )
          .setIcon(defaultCustomIcon)
          .addEventListener('click', () => setSelectedPoint(point))
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
