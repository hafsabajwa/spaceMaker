import React from 'react';
import * as turf from '@turf/turf';

const RightPanel = ({ selectedPolygons }) => {
  // Calculate the total area of selected polygons
  const totalArea = selectedPolygons.reduce((acc, polygon) => {
    return acc + turf.area(polygon);
  }, 0);

  return (
    <div className="right-panel">
      <h2>Area Statistics</h2>
      {selectedPolygons.length > 0 ? (
        <p>Total selected area: {totalArea.toFixed(2)} m²</p>
      ) : (
        <p>Select polygons to see area statistics.</p>
      )}
    </div>
  );
};

export default RightPanel;
