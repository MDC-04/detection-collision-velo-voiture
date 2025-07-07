import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AlertMarkers from './AlertMarkers';

export default function MapView() {
  const [alerts, setAlerts] = useState<any[]>([]);

  // Alert types to charge
  const alertTypes = ["car_behind", "bus_behind", "cyclist_ahead"];

  useEffect(() => {
    const fetchAllAlerts = async () => {
      const all: any[] = [];

      for (const type of alertTypes) {
        try {
          const response = await fetch(`http://localhost:8000/api/cam/alerts/${type}`);
          const data = await response.json();
          all.push(...data);
        } catch (error) {
          console.error(`Erreur lors du chargement de ${type}:`, error);
        }
      }

      setAlerts(all);
    };

    fetchAllAlerts();
  }, []);

  return (
    <MapContainer
      center={[44.8378, -0.5792]} // Bordeaux
      zoom={15}
      maxZoom={30}
      style={{ height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <AlertMarkers alerts={alerts} />
    </MapContainer>
  );
}
