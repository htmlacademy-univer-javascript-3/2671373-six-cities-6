import {useEffect, MutableRefObject, useRef} from 'react';
import L, {Map} from 'leaflet';
import { City } from '../types';

function useMap(
  containerRef: MutableRefObject<HTMLElement | null>,
  city: City
): MutableRefObject<Map | null> {

  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center: {
        lat: city.lat,
        lng: city.lng
      },
      zoom: 9,
      attributionControl: true,
      // crs: L.CRS.Simple
    });

    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      tileSize: 256,
      detectRetina: true,
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapRef, containerRef, city]);

  return mapRef;
}

export default useMap;
