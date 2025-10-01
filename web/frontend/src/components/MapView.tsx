import { MapContainer, TileLayer } from "react-leaflet";
import AlertMarkers from "./AlertMarkers";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "@/styles/LoadingSpinner.module.css";

interface Props {
  selectedAlert?: string;
  stationId?: string;
}

const camAlertTypes = [
  "CAR_BEHIND", "CAR_BEHIND_OFF", "CAR_OVERTAKING", "CAR_OVERTAKING_OFF", "CAR_OVERTAKING_DANGER_OFF",
  "BUS_BEHIND", "BUS_BEHIND_OFF", "BUS_OVERTAKING", "BUS_OVERTAKING_OFF",
  "CYCLIST_AHEAD", "CYCLIST_AHEAD_OFF", "CYCLIST_AHEAD_DANGER", "CYCLIST_AHEAD_DANGER_OFF",
];

const denmAlertTypes = [
  "VULNERABLE_ROAD_USER", "VULNERABLE_ROAD_USER_OFF",
  "INCREASED_VOLUME_OF_TRAFFIC_OFF", "SCHOOL_AREA", "SCHOOL_AREA_OFF"
];

const allAlertTypes = [...camAlertTypes, ...denmAlertTypes];

export default function MapView({ selectedAlert, stationId }: Props) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAlert || stationId) setHasSearched(true);

      setLoading(true);
      setNotFound(false);

      try {
        let fetchedAlerts: any[] = [];

        if (selectedAlert) {
          const endpoint = camAlertTypes.includes(selectedAlert)
            ? `http://localhost:8000/api/cam/alert/${selectedAlert}`
            : `http://localhost:8000/api/denm/alert/${selectedAlert}`;

          const res = await fetch(endpoint);
          fetchedAlerts = await res.json();
        } else if (stationId) {
          const camResults = await Promise.all(
            camAlertTypes.map(async (type) => {
              const res = await fetch(`http://localhost:8000/api/cam/alert/${type}`);
              return res.json();
            })
          );

          const denmResults = await Promise.all(
            denmAlertTypes.map(async (type) => {
              const res = await fetch(`http://localhost:8000/api/denm/alert/${type}`);
              return res.json();
            })
          );

          fetchedAlerts = [...camResults.flat(), ...denmResults.flat()];
        }

        if (stationId) {
          fetchedAlerts = fetchedAlerts.filter(
            (item) => item.message?.station_id?.toString() === stationId
          );
        }

        setAlerts(fetchedAlerts);
        setNotFound(fetchedAlerts.length === 0);
      } catch (err) {
        console.error(err);
        setAlerts([]);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedAlert, stationId]);

  return (
    <MapContainer
      center={[44.8385, -0.5835]}
      zoom={17}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {loading ? (
        <LoadingSpinner />
      ) : hasSearched && notFound ? (
        <div className={styles.message}>
          station_id ou alerte inexistente
        </div>
      ) : (
        <AlertMarkers alerts={alerts} />
      )}
    </MapContainer>
  );
}