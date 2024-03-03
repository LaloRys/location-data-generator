"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";

export default function MapComponent() {
  const [geoData, setGeoData] = useState({
    lat: 19.393919,
    lng: -98.987275,
  });

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: 400, width: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <div>
          <Marker position={[geoData.lat, geoData.lng]} draggable={true}>
            <Popup>Hey! you found me</Popup>
          </Marker>
          <Marker position={[19.385146, -98.990626]} />
        </div>
      )}
    </MapContainer>
  );
}
