import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';

const MapDisplay = ({ lat, lon, zoom, onMarkerSet }) => {
  const [markerPosition, setMarkerPosition] = useState([lat, lon]);

  useEffect(() => {
    setMarkerPosition([lat, lon]);
  }, [lat, lon]);

  const MapEvents = () => {
    useMapEvents({
      click(event) {
        const newLat = event.latlng.lat;
        const newLng = event.latlng.lng;
        setMarkerPosition([newLat, newLng]);
        onMarkerSet(newLat, newLng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={markerPosition}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={markerPosition} />
      <MapEvents />
    </MapContainer>
  );
};

MapDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  onMarkerSet: PropTypes.func.isRequired,
};

export default MapDisplay;
