"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

type LocationMapProps = {
  latitude: number;
  longitude: number;
};

const locationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ChangeMapPosition({
  latitude,
  longitude,
}: LocationMapProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], 17, {
      duration: 1.2,
    });
  }, [latitude, longitude, map]);

  return null;
}

export default function LocationMap({
  latitude,
  longitude,
}: LocationMapProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <MapContainer
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={false}
        className="h-56 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapPosition
          latitude={latitude}
          longitude={longitude}
        />

        <Marker
          position={[latitude, longitude]}
          icon={locationIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">
                Lokasi Absensi
              </p>

              <p className="mt-1 text-neutral-500">
                Lokasi kamu saat melakukan absensi masuk.
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}