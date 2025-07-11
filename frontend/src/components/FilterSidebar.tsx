import { useState } from "react";
import styles from "@/styles/FilterSidebar.module.css";

interface Props {
  onSearch: (alertType: string) => void;
}

export default function FilterSidebar({ onSearch }: Props) {
  const [alertType, setAlertType] = useState<string>("");

  const handleSearch = () => {
    if (alertType) onSearch(alertType);
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
          <option value="">-- Sélectionner --</option>
          <option value="CAR_BEHIND">CAR_BEHIND</option>
          <option value="BUS_BEHIND">BUS_BEHIND</option>
          <option value="CAR_BEHIND_OFF">CAR_BEHIND_OFF</option>
          <option value="BUS_BEHIND_OFF">BUS_BEHIND_OFF</option>
          <option value="CYCLIST_AHEAD">CYCLIST_AHEAD</option>
          <option value="CYCLIST_AHEAD_OFF">CYCLIST_AHEAD_OFF</option>
        </select>
      </div>

      <button onClick={handleSearch} className={styles.searchButton}>
        Chercher
      </button>
    </div>
  );
}
