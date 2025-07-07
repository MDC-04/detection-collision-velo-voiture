import { CircleMarker, Popup } from 'react-leaflet';

type Props = {
  alerts: any[];
};

const getAlertColor = (alertType: string): string => {
  switch (alertType) {
    case "CAR_BEHIND":
      return "red";
    case "BUS_BEHIND":
      return "blue";
    case "CYCLIST_AHEAD":
      return "black";
    default:
      return "none";
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
            radius={4}
            fillColor={color}
            color={color}
            weight={0}
            fillOpacity={1}
          >
            <Popup>
              <strong>{alertType}</strong>
              <br />
              Station ID : {alert.message?.station_id}
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
