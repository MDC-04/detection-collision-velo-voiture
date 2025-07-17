import { CircleMarker, Popup } from "react-leaflet";
import styles from "@/styles/AlertMarkers.module.css"

interface Props {
  alerts: any[];
}

const getAlertColor = (alertType: string): string => {
  switch (alertType) {
    case "CAR_BEHIND":
    case "CAR_BEHIND_OFF":
    case "CAR_OVERTAKING":
    case "CAR_OVERTAKING_OFF":
    case "CAR_OVERTAKING_DANGER_OFF":
      return "red";

    case "BUS_BEHIND":
    case "BUS_BEHIND_OFF":
    case "BUS_OVERTAKING":
    case "BUS_OVERTAKING_OFF":
      return "blue";

    case "CYCLIST_AHEAD":
    case "CYCLIST_AHEAD_OFF":
    case "CYCLIST_AHEAD_DANGER":
    case "CYCLIST_AHEAD_DANGER_OFF":
      return "green";

    default:
      return "gray";
  }
};

export default function AlertMarkers({ alerts }: Props) {
  return (
    <>
      {alerts.map((alert, index) => {
        const pos = alert.message?.basic_container?.reference_position;
        const alertType = alert.extra?.[0]?.eyenet_alert;

        if (!pos || !alertType) return null;

        const lat = pos.latitude / 1e7;
        const lon = pos.longitude / 1e7;
        const color = getAlertColor(alertType);

        return (
          <CircleMarker
            key={index}
            center={[lat, lon]}
            radius={alerts.length < 100 ? 8 : 4}
            pathOptions={{ color, fillColor: color, fillOpacity: 1 }}
          >
            {(
              <Popup>
                <div className={styles.popupContainer}>
                  <div><strong>Type :</strong> {alertType}</div>
                  <div><strong>Station ID :</strong> {alert.message?.station_id}</div>
                  <div><strong>Vitesse :</strong> {alert.message?.high_frequency_container?.speed ?? "?"} cm/s</div>
                  <div><strong>Direction :</strong> {alert.message?.high_frequency_container?.heading ?? "?"}°</div>
                  <div><strong>Horodatage :</strong> {
                    new Date(alert.timestamp).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }</div>
                </div>
              </Popup>
            
            )}
          </CircleMarker>
        );
      })}
    </>
  );
}
