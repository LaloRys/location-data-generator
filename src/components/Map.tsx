"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapComponent({ data }: any) {
  return (
    <MapContainer
      center={[data[0].Latitude, data[0].Longitude]}
      zoom={4}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <div>
        {data.map((item: any, index: any) =>
          item.Latitude && item.Longitude ? (
            <Marker key={index} position={[item.Latitude, item.Longitude]}>
              <Popup>
                COMMENTS: <span className="font-bold">{item["COMMENTS"]}</span>{" "}
                <br />
                Accession Prefix:{" "}
                <span className="font-bold">{item["Accession Prefix"]}</span>
              </Popup>
            </Marker>
          ) : null
        )}
      </div>
    </MapContainer>
  );
}
