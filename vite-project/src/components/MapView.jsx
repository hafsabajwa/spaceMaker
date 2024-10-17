import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapView = ({ geoJsonData, setSelectedPolygons, performOperation }) => {
  const [selected, setSelected] = useState([]);
  const featureGroupRef = useRef(null); // Reference to FeatureGroup

  // Event listener for each polygon (feature)
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        const selectedPolygon = feature;

        // Select up to two polygons
        if (selected.length < 2) {
          setSelected([...selected, selectedPolygon]);
          setSelectedPolygons((prev) => [...prev, selectedPolygon]);

          // Highlight the selected polygons (for user feedback)
          layer.setStyle({
            color: 'blue',
            weight: 5,
          });
        }
      },
    });
  };

  return (
    <div className="map-view">
      <MapContainer center={[48.8566, 2.3522]} zoom={14} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Wrap GeoJSON in a FeatureGroup */}
        <FeatureGroup ref={featureGroupRef}>
          <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
          
          {/* Enable draw and edit controls */}
          <EditControl
            position="topright"
            onEdited={(e) => {
              const updatedPolygons = e.layers.toGeoJSON().features;
              setSelectedPolygons(updatedPolygons);
            }}
            onCreated={(e) => {
              const layer = e.layer;
              const newPolygon = layer.toGeoJSON();
              setSelectedPolygons((prev) => [...prev, newPolygon]);
            }}
            onDeleted={(e) => {
              const deletedLayers = e.layers;
              deletedLayers.eachLayer((layer) => {
                const geoJsonLayer = layer.toGeoJSON();
                setSelectedPolygons((prev) =>
                  prev.filter((polygon) => polygon !== geoJsonLayer)
                );
              });
            }}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              polyline: false,
              marker: false
            }}
            edit={{
              featureGroup: featureGroupRef.current,  // Attach the feature group for editing and moving
              remove: true,   // Allow removing polygons
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Display buttons only if two polygons are selected */}
      {selected.length === 2 && (
        <div className="operation-buttons">
          <button onClick={() => performOperation('union', selected)}>Union</button>
          <button onClick={() => performOperation('intersect', selected)}>Intersect</button>
        </div>
      )}
    </div>
  );
};

export default MapView;
