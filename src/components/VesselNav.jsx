import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";
import "../styles.css";
import L from "leaflet";
import "../assets/vessel.png";
import InfoCard from "./InfoCard";

const startCoordinates = [22.1696, 91.4996];
const endCoordinates = [22.2637, 91.7159];
const speed = 20000;
const refreshRate = 2;

const VesselNav = () => {
  const [center, setCenter] = useState({
    lat: startCoordinates[0] + (endCoordinates[0] - startCoordinates[0]) / 2,
    lng: startCoordinates[1] + (endCoordinates[1] - startCoordinates[1]) / 2,
  });
  const defaultZoomLevel = 11;
  const [polylineRendered, setPolylineRendered] = useState(false);

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
    iconAnchor: [10, 55],
  });

  const vesselMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  const calculateAngle = (pointA, pointB) => {
    return (
      (Math.atan2(pointB[1] - pointA[1], pointB[0] - pointA[0]) * 180) / Math.PI
    );
  };

  const angle = calculateAngle(startCoordinates, endCoordinates);

  useEffect(() => {
    if (polylineRendered) {
      const startPoint = L.latLng(startCoordinates[0], startCoordinates[1]);
      const endPoint = L.latLng(endCoordinates[0], endCoordinates[1]);
      const distance = startPoint.distanceTo(endPoint);
      const timeHours = distance / (speed * 1000);
      const numFrames = Math.ceil(refreshRate * timeHours * 3600);
      const timeInterval = (timeHours * 3600) / numFrames;

      let currentFrame = 0;

      function updateVesselPosition() {
        const polyline = polylineRef.current;

        if (!polyline) return;

        const positions = polyline.getLatLngs();

        if (currentFrame >= numFrames) {
          return;
        }

        const percentage = currentFrame / numFrames;
        const index = Math.floor(percentage * (positions.length - 1));

        const startPosition = positions[index];
        const endPosition = positions[index + 1];

        const deltaLat = endPosition.lat - startPosition.lat;
        const deltaLng = endPosition.lng - startPosition.lng;

        const newPosition = L.latLng(
          startPosition.lat + deltaLat * percentage,
          startPosition.lng + deltaLng * percentage
        );

        vesselMarkerRef.current.setLatLng(newPosition);

        currentFrame++;

        setTimeout(updateVesselPosition, timeInterval * 1000);
      }

      updateVesselPosition();
    }
  }, [startCoordinates, endCoordinates, speed, refreshRate, polylineRendered]);

  return (
    <div className="container">
      {/* <div>
        <h1>Marine Vessel Navigation</h1>
      </div> */}
      <div className="cardContainer">
        <InfoCard />
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
          <Polyline
            ref={(ref) => {
              polylineRef.current = ref;
              if (ref) setPolylineRendered(true);
            }}
            positions={[startCoordinates, endCoordinates]}
            color="red"
            opacity={0}
          />
          <Marker
            ref={vesselMarkerRef}
            position={startCoordinates}
            icon={vesselIcon}
            rotationAngle={angle}
            className="vessel-marker"
          ></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default VesselNav;
