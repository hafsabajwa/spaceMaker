import React from 'react';

const LeftPanel = ({ setGeoJsonData, geoJsonData1, geoJsonData2 }) => {
  return (
    <div className="left-panel">
      <h2>Proposed Solutions</h2>
      {/* Button to load Solution 1 */}
      <button onClick={() => setGeoJsonData(geoJsonData1)}>Solution 1</button>
      {/* Button to load Solution 2 */}
      <button onClick={() => setGeoJsonData(geoJsonData2)}>Solution 2</button>
    </div>
  );
};

export default LeftPanel;
