import { MapContainer, TileLayer } from "react-leaflet";
import AlertMarkers from "./AlertMarkers";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "@/styles/LoadingSpinner.module.css"

interface Props {
  selectedAlert?: string;
  stationId?: string;
}

const alertColorMap: Record<string, string> = {
  CAR_BEHIND: "red",
  CAR_BEHIND_OFF: "red",
  CAR_OVERTAKING: "red",
  CAR_OVERTAKING_OFF: "red",
  CAR_OVERTAKING_DANGER_OFF: "red",
  BUS_BEHIND: "blue",
  BUS_BEHIND_OFF: "blue",
  BUS_OVERTAKING: "blue",
  BUS_OVERTAKING_OFF: "blue",
  CYCLIST_AHEAD: "green",
  CYCLIST_AHEAD_OFF: "green",
  CYCLIST_AHEAD_DANGER: "green",
  CYCLIST_AHEAD_DANGER_OFF: "green",
};

const allAlertTypes = Object.keys(alertColorMap);

export default function MapView({ selectedAlert, stationId }: Props) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (selectedAlert || stationId) {
        setHasSearched(true);
      }      
      setLoading(true);
      setNotFound(false);

      try {
        let fetchedAlerts: any[] = [];

        if (selectedAlert) {
          const res = await fetch(
            `http://localhost:8000/api/cam/alert/${selectedAlert}`
          );
          fetchedAlerts = await res.json();
        } else if (stationId) {
          const allResults = await Promise.all(
            allAlertTypes.map(async (type) => {
              const res = await fetch(
                `http://localhost:8000/api/cam/alert/${type}`
              );
              return res.json();
            })
          );
          fetchedAlerts = allResults.flat();
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
        <AlertMarkers
          alerts={alerts}
          color={selectedAlert ? alertColorMap[selectedAlert] ?? "gray" : "gray"}
        />
      )}
    </MapContainer>
  );
}
