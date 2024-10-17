import React, { useState, useEffect } from "react";
import * as turf from "@turf/turf";
import LeftPanel from "./components/LeftPanel";
import MapView from "./components/MapView";
import RightPanel from "./components/RightPanel";
import SE_State_Management_Polygons_1 from "./data/SE_State_Management_Polygons_1.json";
import SE_State_Management_Polygons_2 from "./data/SE_State_Management_Polygons_2.json";
import './App.css';

const solutions = [
  SE_State_Management_Polygons_1,
  SE_State_Management_Polygons_2,
];

function App() {
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const [initialPolygons] = useState(solutions.map(solution => solution.features)); // Store initial polygons for each solution
  const [polygons, setPolygons] = useState(initialPolygons[selectedSolutionIndex]); // Load polygons for current solution
  const [selectedPolygons, setSelectedPolygons] = useState([]);
  const [editedSolutions, setEditedSolutions] = useState([null, null]); // Store edited solutions

  // Effect to load the polygons when switching between solutions
  useEffect(() => {
    if (editedSolutions[selectedSolutionIndex]) {
      // Load edited polygons if they exist for the selected solution
      setPolygons(editedSolutions[selectedSolutionIndex].features);
    } else {
      // Load the initial polygons for the selected solution
      setPolygons(initialPolygons[selectedSolutionIndex]);
    }
  }, [selectedSolutionIndex, editedSolutions, initialPolygons]);

  const onPolygonClick = (polygonIndex) => {
    setSelectedPolygons((prevSelected) => {
      if (prevSelected.includes(polygonIndex)) {
        return prevSelected.filter((index) => index !== polygonIndex);
      } else {
        return [...prevSelected, polygonIndex];
      }
    });
  };

  const updateEditedSolutions = (newPolygons) => {
    const updatedSolutions = [...editedSolutions]; // Copy current edited solutions
    updatedSolutions[selectedSolutionIndex] = { features: newPolygons }; // Update the current solution
    setEditedSolutions(updatedSolutions); // Set the updated solutions in state
  };

  const handleUnion = () => {
    if (selectedPolygons.length === 2) {
      try {
        const poly1 = polygons[selectedPolygons[0]].geometry;
        const poly2 = polygons[selectedPolygons[1]].geometry;

        console.log("Poly1: " + JSON.stringify(poly1, null, 4));
        console.log("Poly2: " + JSON.stringify(poly2, null, 4));

        // Use JSTS via the global window object
        const reader = new window.jsts.io.GeoJSONReader();
        const geom1 = reader.read(turf.polygon(poly1.coordinates)).geometry;
        const geom2 = reader.read(turf.polygon(poly2.coordinates)).geometry;

        // Perform the union operation with JSTS
        const unionGeom = geom1.union(geom2);

        if (unionGeom) {
          // Convert JSTS geometry back to GeoJSON
          const writer = new window.jsts.io.GeoJSONWriter();
          const unionGeoJson = writer.write(unionGeom);

          const newPolygons = polygons.filter((_, index) => !selectedPolygons.includes(index));
          setPolygons([...newPolygons, { type: 'Feature', geometry: unionGeoJson }]);
          setSelectedPolygons([]);
          updateEditedSolutions([...newPolygons, { type: 'Feature', geometry: unionGeoJson }]); // Update edited solution state
        } else {
          alert("Union operation failed");
        }
      } catch (error) {
        console.error("Union Error: ", error);
        alert("Error: " + error.message);
      }
    }
  };

  const handleIntersect = () => {
    if (selectedPolygons.length === 2) {
      try {
        const poly1 = polygons[selectedPolygons[0]].geometry;
        const poly2 = polygons[selectedPolygons[1]].geometry;

        console.log("Poly1: " + JSON.stringify(poly1, null, 4));
        console.log("Poly2: " + JSON.stringify(poly2, null, 4));

        // Use JSTS via the global window object
        const reader = new window.jsts.io.GeoJSONReader();
        const geom1 = reader.read(turf.polygon(poly1.coordinates)).geometry;
        const geom2 = reader.read(turf.polygon(poly2.coordinates)).geometry;

        // Perform the intersection operation with JSTS
        const intersectionGeom = geom1.intersection(geom2);

        if (intersectionGeom && !intersectionGeom.isEmpty()) {
          // Convert JSTS geometry back to GeoJSON
          const writer = new window.jsts.io.GeoJSONWriter();
          const intersectionGeoJson = writer.write(intersectionGeom);

          const newPolygons = polygons.filter((_, index) => !selectedPolygons.includes(index));
          setPolygons([...newPolygons, { type: 'Feature', geometry: intersectionGeoJson }]);
          setSelectedPolygons([]);
          updateEditedSolutions([...newPolygons, { type: 'Feature', geometry: intersectionGeoJson }]); // Update edited solution state
        } else {
          alert("No intersection found");
        }
      } catch (error) {
        console.error("Intersection Error: ", error);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="app">
      <div className="left-panel">
        <LeftPanel
          solutions={solutions}
          setSelectedSolutionIndex={setSelectedSolutionIndex}
          handleUnion={handleUnion}
          handleIntersect={handleIntersect}  
          selectedPolygons={selectedPolygons}
          calculateTotalArea={() => selectedPolygons.reduce((total, index) => {
            const polygon = turf.polygon(polygons[index].geometry.coordinates);
            return total + turf.area(polygon);
          }, 0)}
        />
      </div>
      <div className="map-view">
        <MapView
          polygons={polygons}
          onPolygonClick={onPolygonClick}
          selectedPolygons={selectedPolygons}
        />
      </div>
      <div className="right-panel">
        <RightPanel selectedPolygons={selectedPolygons.map(index => polygons[index])} />
      </div>
    </div>
  );
}

export default App;
