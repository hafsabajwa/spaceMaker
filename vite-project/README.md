# Polygon Operations Web Application

This is a React-based web application that allows users to manage and perform spatial operations (union and intersection) on GeoJSON polygon feature collections. The application utilizes Turf.js and JSTS for spatial analysis and geometry operations.

## Features

- **Multiple Polygon Solutions:** Users can switch between different sets of polygon solutions to explore and modify.
- **Polygon Selection:** Users can select polygons from the map by clicking on them.
- **Union Operation:** Combines two selected polygons into one, merging their areas.
- **Intersection Operation:** Finds the common area between two selected polygons.
- **Area Calculation:** Displays the total area of selected polygons.
- **Map Visualization:** Visualize polygons on an interactive map using React Leaflet.

## Getting Started

### Prerequisites

Before running this project, ensure that you have the following installed:

- Node.js (version 12 or higher)
- npm (Node package manager)

### Installation

Clone this repository:

```bash
git clone https://github.com/hafsabajwa/spaceMaker.git
```

Navigate to the project directory:

```bash
cd polygon-operations-app
 ```

Install the dependencies:
```bash
npm install
```
### Running the Application
Start the development server:
```bash
npm run dev
```
Open your browser and go to http://localhost:3000 to view the application.
### Project Structure
```bash
├── public/
├── src/
│   ├── components/
│   │   ├── LeftPanel.js       # Left sidebar for selecting solutions and performing operations
│   │   ├── MapView.js         # Map component displaying polygons
│   │   ├── RightPanel.js      # Right sidebar for displaying area statistics
│   ├── data/
│   │   ├── SE_State_Management_Polygons_1.json   # First solution set of polygons
│   │   ├── SE_State_Management_Polygons_2.json   # Second solution set of polygons
│   ├── App.js                 # Main app component
│   └── App.css                # Global styles
├── package.json
├── README.md
└── .gitignore
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for linting errors.

## How to Use

1. **Select a Solution:** In the left sidebar, choose between Solution 1 or Solution 2 by clicking on the list of proposed solutions.
2. **Polygon Selection:** Click on polygons displayed on the map to select or deselect them. Selected polygons will be highlighted in red.
3. **Perform Union/Intersect:** After selecting two polygons, use the Union or Intersect buttons in the left sidebar to merge or intersect the polygons. The result will replace the selected polygons on the map.
4. **Area Calculation:** The total area of the selected polygons is displayed in both the left and right panels.

## Dependencies

- **React:** Front-end library for building user interfaces.
- **Turf.js:** Library for geospatial analysis in JavaScript.
- **JSTS:** JavaScript Topology Suite for geometric operations.
- **React Leaflet:** Map components for React using Leaflet.

## Known Issues

- The union and intersection operations only support two polygons at a time.
- Ensure the JSTS library is correctly linked in the project via the global window object.
