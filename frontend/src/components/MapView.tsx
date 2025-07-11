import { MapContainer, TileLayer } from "react-leaflet";
import AlertMarkers from "./AlertMarkers";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  selectedAlert: string | null;
}

const alertColorMap: Record<string, string> = {
  CAR_BEHIND: "red",
  BUS_BEHIND: "green",
  CAR_BEHIND_OFF: "orange",
  BUS_BEHIND_OFF: "purple",
  CYCLIST_AHEAD: "blue",
  CYCLIST_AHEAD_OFF: "black",
};

export default function MapView({ selectedAlert }: Props) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAlert) return;

    setLoading(true);
    fetch(`http://localhost:8000/api/cam/alert/${selectedAlert}`)
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedAlert]);

  return (
    <MapContainer
      center={[44.8378, -0.5792]}
      zoom={17}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <AlertMarkers
          alerts={alerts}
          color={alertColorMap[selectedAlert ?? ""] ?? "gray"}
        />
      )}
    </MapContainer>
  );
}