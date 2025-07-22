import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatDate } from "../lib/dateUtils";

// Fix Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  price: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapProps {
  appointments: Appointment[];
  center: [number, number];
  zoom?: number;
  onMarkerClick?: (appointment: Appointment) => void;
}

export function Map({
  appointments,
  center,
  zoom = 12,
  onMarkerClick,
}: MapProps) {
  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {appointments.map((appointment) => (
        <Marker
          key={appointment.id}
          position={[appointment.lat, appointment.lng]}
          eventHandlers={{
            click: () => {
              onMarkerClick?.(appointment);
            },
          }}
        >
          <Popup>
            <div className="space-y-2 min-w-48">
              <h4 className="font-semibold">{appointment.service}</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Client:</strong> {appointment.clientName}
                </div>
                <div>
                  <strong>Date:</strong> {formatDate(appointment.date)} à{" "}
                  {appointment.time}
                </div>
                <div>
                  <strong>Téléphone:</strong> {appointment.clientPhone}
                </div>
                <div>
                  <strong>Email:</strong> {appointment.clientEmail}
                </div>
                <div>
                  <strong>Adresse:</strong> {appointment.address}
                </div>
                <div className="text-lg font-semibold text-primary pt-2">
                  {appointment.price}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
