import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ polygons, onPolygonClick, selectedPolygons }) {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {polygons.map((feature, index) => (
        <GeoJSON
          key={index}
          data={feature}
          eventHandlers={{ click: () => onPolygonClick(index) }}
          style={{ color: selectedPolygons.includes(index) ? 'red' : 'blue' }}
        />
      ))}
    </MapContainer>
  );
}

export default MapView;
