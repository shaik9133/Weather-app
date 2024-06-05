import React, { useState, useRef } from 'react';
import WeatherDisplay from './WeatherDisplay';
import MapDisplay from './MapDisplay';
import './App.css';

const App = () => {
  const [latitude, setLatitude] = useState(37.7749); // Default to San Francisco
  const [longitude, setLongitude] = useState(-122.4194);
  const [unit, setUnit] = useState('metric');
  const [zoom] = useState(10);

  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(latitudeRef.current.value);
    const lon = parseFloat(longitudeRef.current.value);
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleMarkerSet = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather and Map Application</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Latitude:
          <input
            type="number"
            name="latitude"
            defaultValue={latitude}
            ref={latitudeRef}
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="longitude"
            defaultValue={longitude}
            ref={longitudeRef}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <label>
        Unit:
        <select value={unit} onChange={handleUnitChange}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </label>
      <MapDisplay
        lat={latitude}
        lon={longitude}
        zoom={zoom}
        onMarkerSet={handleMarkerSet}
      />
      <WeatherDisplay lat={latitude} lon={longitude} unit={unit} />
    </div>
  );
};

export default App;
