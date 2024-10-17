import React from 'react';

function LeftPanel({ solutions, setSelectedSolutionIndex, handleUnion, handleIntersect, selectedPolygons, calculateTotalArea }) {
  return (
    <div className="sidebar">
      <h2>Proposed Solutions</h2>
      <ul>
        {solutions.map((_, index) => (
          <li
            key={index}
            onClick={() => setSelectedSolutionIndex(index)}
            title={`Select solution ${index + 1}`}
          >
            Solution {index + 1}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button
          onClick={handleUnion}
          disabled={selectedPolygons.length !== 2}
          title={
            selectedPolygons.length === 2
              ? 'Click to merge the selected polygons'
              : 'Select exactly two polygons to perform union'
          }
        >
          Union
        </button>
        <button
          onClick={handleIntersect}
          disabled={selectedPolygons.length !== 2}
          title={
            selectedPolygons.length === 2
              ? 'Click to intersect the selected polygons'
              : 'Select exactly two polygons to perform intersection'
          }
        >
          Intersect
        </button>
      </div>
      <h3>Total Area: {calculateTotalArea()} m²</h3>
    </div>
  );
}

export default LeftPanel;
