import React from "react";
import "../styles.css";

const InfoCard = () => {
  return (
    <div className="card">
      <div className="from-info">
        <p><span>From:</span></p>
        <p><span>Latitude:</span> 22.1696</p>
        <p><span>Longitude:</span> 91.4996</p>
      </div>
      <div className="speed-info">
        <p><span>Speed:</span> 20 km/hr</p>
      </div>
      <div className="to-info">
        <p><span>To:</span></p>
        <p><span>Latitude:</span> 22.2637</p>
        <p><span>Longitude:</span> 91.7159</p>
      </div>
    </div>
  );
};

export default InfoCard;
