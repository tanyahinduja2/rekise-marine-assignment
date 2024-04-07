import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";
import "../styles.css";
import L from "leaflet";
import "../assets/vessel.png";

const startCoordinates = [22.1696, 91.4996];
const endCoordinates = [22.2637, 91.7159];
const speed = 2000;

const VesselNav = () => {
  const [center, setCenter] = useState({
    lat: startCoordinates[0],
    lng: startCoordinates[1],
  });
  const defaultZoomLevel = 11;

  const startIcon = new L.Icon({
    iconUrl: require("../assets/start-icon.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  const endIcon = new L.Icon({
    iconUrl: require("../assets/end-icon.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  const vesselIcon = new L.Icon({
    iconUrl: require("../assets/vessel.png"),
    iconSize: [16, 85],
    iconAnchor: [16, 85],
  });

  const vesselMarkerRef = useRef(null);

  const calculateAngle = (pointA, pointB) => {
    return (Math.atan2(pointB[1] - pointA[1], pointB[0] - pointA[0]) * 180) / Math.PI;
  };

  const angle = calculateAngle(startCoordinates, endCoordinates);

  return (
    <div className="container">
      <div>
        <h1>Marine Vessel Navigation</h1>
      </div>
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={defaultZoomLevel}
          style={{
            height: "calc(100vh - 64px)",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            ref={vesselMarkerRef}
            position={startCoordinates}
            icon={vesselIcon}
            rotationAngle={angle} // Initial rotation angle
          ></Marker>
          <Polyline positions={[startCoordinates, endCoordinates]} color="red" />
          <Marker position={startCoordinates} icon={startIcon}>
            <Popup>
              <p>
                Lat: {startCoordinates[0]}
                <br></br>Long: {startCoordinates[1]}
              </p>
            </Popup>
          </Marker>
          <Marker position={endCoordinates} icon={endIcon}>
            <Popup>
              <p>
                Lat: {endCoordinates[0]}
                <br></br>Long: {endCoordinates[1]}
              </p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default VesselNav;
