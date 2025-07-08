import React from "react";
import styles from '@/styles/FilterSidebar.module.css'

type Props = {
    children?: React.ReactNode;
};

export default function FilterSidebar({ children }: Props) {
    return (
        <div className={styles.sidebar}>
            <h3>Filtres</h3>
            {children}
        </div>
    );
}