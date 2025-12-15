import {FC, memo, useEffect, useRef} from 'react';
import {useMap} from '../hooks';
import {Marker, layerGroup} from 'leaflet';
import { defaultCustomIcon, currentCustomIcon } from '../constants/icons';
import 'leaflet/dist/leaflet.css';
import {IMap} from './Map.type.ts';

const Map: FC<IMap> = memo((props: IMap) => {

  const { points, selectedPoint, city } = props;
  const containerRef = useRef(null);
  const map = useMap(containerRef, city);

  useEffect(() => {
    if (map.current) {
      const markerLayer = layerGroup().addTo(map.current);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (selectedPoint) {
        map.current.setView({lat: selectedPoint.location.latitude, lng: selectedPoint.location.longitude}, selectedPoint.location.zoom);
      } else {
        map.current.setView({lat: city.location.latitude, lng: city.location.longitude}, city.location.zoom);
      }

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
});

Map.displayName = 'Map';

export default Map;
