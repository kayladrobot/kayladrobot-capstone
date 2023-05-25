import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import "./Map.scss";

const CustomMap = (props) => {
  return (
    <div className="map">
      <LoadScript googleMapsApiKey="AIzaSyCbmUMQ8BvBc7VfBbr-5etQSLcrM4Z8-AU">
        <GoogleMap className="map-container" google={props.google} />
      </LoadScript>
    </div>
  );
};

export default CustomMap;
