import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapperProps {
  latitude: number;
  longitude: number;
  place: string;
}

const Mapper: React.FC<MapperProps> = ({ latitude, longitude, place }) => {
  mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude], 
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place}</h3>`))
      .addTo(map);

    return () => map.remove();
  }, [latitude, longitude, place]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[350px] rounded-2xl p-2 bg-white shadow-lg"
    />
  );
};

export default Mapper;
