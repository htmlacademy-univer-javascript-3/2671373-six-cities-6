import {useEffect, MutableRefObject, useRef} from 'react';
import L, {Map} from 'leaflet';
import {TCity} from '@/shared/model/offer';

function useMap(
  containerRef: MutableRefObject<HTMLElement | null>,
  city: TCity
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
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      zoom: 9,
      attributionControl: true,
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
