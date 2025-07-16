import { useState } from "react";
import styles from "@/styles/FilterSidebar.module.css";

interface Props {
  onSearch: (filters: { alertType?: string; stationId?: string }) => void;
}

export default function FilterSidebar({ onSearch }: Props) {
  const [alertType, setAlertType] = useState<string>("");
  const [stationId, setStationId] = useState<string>("");

  const handleSearch = () => {
    const filters: { alertType?: string; stationId?: string } = {};
    if (alertType) filters.alertType = alertType;
    if (stationId) filters.stationId = stationId;
    onSearch(filters);
  };

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>Filtres</h1>

      <div className={styles.filterGroup}>
        <label htmlFor="alertType">Type d’alerte</label>
        <select
          id="alertType"
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
        >
          <option value="">-- Toutes --</option>
          <option value="CAR_BEHIND">CAR_BEHIND</option>
          <option value="CAR_BEHIND_OFF">CAR_BEHIND_OFF</option>
          <option value="CAR_OVERTAKING">CAR_OVERTAKING</option>
          <option value="CAR_OVERTAKING_OFF">CAR_OVERTAKING_OFF</option>
          <option value="CAR_OVERTAKING_DANGER_OFF">CAR_OVERTAKING_DANGER_OFF</option>
          <option value="BUS_BEHIND">BUS_BEHIND</option>
          <option value="BUS_BEHIND_OFF">BUS_BEHIND_OFF</option>
          <option value="BUS_OVERTAKING">BUS_OVERTAKING</option>
          <option value="BUS_OVERTAKING_OFF">BUS_OVERTAKING_OFF</option>
          <option value="CYCLIST_AHEAD">CYCLIST_AHEAD</option>
          <option value="CYCLIST_AHEAD_OFF">CYCLIST_AHEAD_OFF</option>
          <option value="CYCLIST_AHEAD_DANGER">CYCLIST_AHEAD_DANGER</option>
          <option value="CYCLIST_AHEAD_DANGER_OFF">CYCLIST_AHEAD_DANGER_OFF</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="stationId">Station ID</label>
        <input
          id="stationId"
          type="number"
          placeholder="ex: 1010"
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
        />
      </div>

      <button onClick={handleSearch} className={styles.searchButton}>
        Chercher
      </button>
    </div>
  );
}
