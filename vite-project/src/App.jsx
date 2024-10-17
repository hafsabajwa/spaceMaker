import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import MapView from './components/MapView';
import RightPanel from './components/RightPanel';
import geoJsonData1 from './data/SE_State_Management_Polygons_1.json';
import geoJsonData2 from './data/SE_State_Management_Polygons_2.json';
import * as turf from '@turf/turf';
import './App.css';

function App() {
  const [geoJsonData, setGeoJsonData] = useState(geoJsonData1);  // Current dataset (Solution 1 by default)
  const [selectedPolygons, setSelectedPolygons] = useState([]);
  const [updatedFeatures, setUpdatedFeatures] = useState(geoJsonData1.features);  // Stores the features to display

  // Use useEffect to ensure updatedFeatures is reset whenever geoJsonData changes
  useEffect(() => {
    setUpdatedFeatures(geoJsonData.features);
    setSelectedPolygons([]);
  }, [geoJsonData]);

  // Perform Union or Intersect operations on the selected polygons
  const performOperation = (operation, selected) => {
    let newFeature;

    // Access the geometry of the two selected polygons
    const poly1 = selected[0].geometry;
    const poly2 = selected[1].geometry;

    if (operation === 'union') {
      newFeature = turf.union(poly1, poly2);
    } else if (operation === 'intersect') {
      newFeature = turf.intersect(poly1, poly2);
    }

    if (newFeature) {
      const newGeoJSONFeature = {
        type: 'Feature',
        properties: {},
        geometry: newFeature.geometry,
      };

      // Remove the selected polygons and add the resulting polygon
      const newFeatures = updatedFeatures.filter(
        (feature) => feature !== selected[0] && feature !== selected[1]
      );

      // Update features and clear selection
      setUpdatedFeatures([...newFeatures, newGeoJSONFeature]);
      setSelectedPolygons([]);
    }
  };

  // Handle the switch between Solution 1 and Solution 2
  const handleSolutionSwitch = (solutionData) => {
    setGeoJsonData(solutionData);  // Update geoJsonData with the new solution
  };

  return (
    <div className="app-container">
      {/* Left panel with Solution 1 and Solution 2 buttons */}
      <LeftPanel 
        setGeoJsonData={handleSolutionSwitch} 
        geoJsonData1={geoJsonData1} 
        geoJsonData2={geoJsonData2} 
      />

      {/* MapView: Display the polygons on the map */}
      <MapView 
        geoJsonData={{ ...geoJsonData, features: updatedFeatures }} 
        setSelectedPolygons={setSelectedPolygons} 
        performOperation={performOperation} 
      />

      {/* Right panel to show statistics */}
      <RightPanel selectedPolygons={selectedPolygons} />
    </div>
  );
}

export default App;
