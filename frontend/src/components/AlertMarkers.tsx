import { CircleMarker, Popup } from 'react-leaflet';

type Props = {
  alerts: any[];
};

// Fonction pour associer une couleur à un type d’alerte
const getAlertColor = (alertType: string): string => {
  switch (alertType) {
    case "CAR_BEHIND":
      return "red";
    case "BUS_BEHIND":
      return "blue";
    default:
      return "none";
  }
};

export default function AlertMarkers({ alerts }: Props) {
  return (
    <>
      {alerts.map((alert, index) => {
        const pos = alert.message.basic_container.reference_position;
        const lat = pos.latitude / 1e7;
        const lon = pos.longitude / 1e7;

        const alertType = alert.extra?.[0]?.eyenet_alert;
        if (!alertType) return null;

        const color = getAlertColor(alertType);

        return (
          <CircleMarker key={index} center={[lat, lon]} radius={6} color={color}>
            <Popup>
              Alerte : {alertType}
              <br />
              Station ID : {alert.message.station_id}
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
