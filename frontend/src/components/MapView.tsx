import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AlertMarkers from './AlertMarkers';

export default function MapView() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/cam/alerts') // route à créer ensuite
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  }, []);

  return (
    <MapContainer center={[44.8378, -0.5792]} zoom={14} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <AlertMarkers alerts={alerts} />
    </MapContainer>
  );
}
