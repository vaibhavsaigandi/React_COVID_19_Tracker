import React from "react";
import "./Map.css";
import { showDataOnMap } from "./util";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

const Map = ({countries,casesType,center,zoom}) => {
  return (
    <div className="Map">
      <LeafletMap center={center} zoom={zoom}>
        {/* when we intialize a leaflet it will automatically create a container named leaflet-container */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
{/* loop through all the countries and draw circles */}
{showDataOnMap(countries,casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
