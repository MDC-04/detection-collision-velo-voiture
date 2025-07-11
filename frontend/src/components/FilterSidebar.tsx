import React, { useState } from "react";
import styles from '@/styles/FilterSidebar.module.css'

type Props = {
    children?: React.ReactNode;
};

const alertTypes = [
    "BUS_BEHIND",
    "CAR_BEHIND",
    "BUS_BEHIND_OFF",
    "CAR_BEHIND_OFF",
    "CYCLIST_AHEAD",
    "CYCLIST_AHEAD_OFF"
];

export default function FilterSidebar({ children }: Props) {
    const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

    const handleAlertChange = (alert: string) => {
        setSelectedAlerts((prev) =>
            prev.includes(alert)
            ? prev.filter((a) => a != alert)
            : [...prev, alert]
        );
    };

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Filtres</h3>
            
            <div>
                <div className={styles.sectionTitle}>Type d'alerte</div>
                <div className={styles.checkboxGroup}>
                    {alertTypes.map((alert) => (
                        <label key={alert}>
                            <input
                                type="checkbox"
                                checked={selectedAlerts.includes(alert)}
                            />
                            {alert}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}