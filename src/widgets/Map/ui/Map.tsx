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
    const mapRef = map.current;
    if (mapRef) {
      const markerLayer = layerGroup().addTo(mapRef);
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
        mapRef.setView({lat: selectedPoint.location.latitude, lng: selectedPoint.location.longitude}, selectedPoint.location.zoom);
      } else {
        mapRef.setView({lat: city.location.latitude, lng: city.location.longitude}, city.location.zoom);
      }

      return () => {
        mapRef?.removeLayer(markerLayer);
      };
    }
  }, [city, map, points, selectedPoint]);

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
