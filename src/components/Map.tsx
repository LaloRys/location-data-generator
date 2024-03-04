"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";

export default function MapComponent({ data }: any) {
  console.log(data);
  console.log(data[0].Longitude);
  console.log(data[0].Latitude);

  return (
    <MapContainer
      center={[data[0].Latitude, data[0].Longitude]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: 400, width: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <div>
        <Marker position={[data[0].Latitude, data[0].Longitude]} />
        <Marker position={[data[1].Latitude, data[1].Longitude]} />
        {data.map((item: any, index: any) =>
          item.Latitude && item.Longitude ? (
            <Marker key={index} position={[item.Latitude, item.Longitude]} />
          ) : null
        )}
      </div>
    </MapContainer>
  );
}
