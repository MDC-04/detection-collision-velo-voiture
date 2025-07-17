import styles from "@/styles/Legend.module.css";

export default function Legend() {
  return (
    <div className={styles.legend}>
      <h4>Type d'alerte</h4>
      <div><span className={styles.red}></span> Voiture</div>
      <div><span className={styles.blue}></span> Bus</div>
      <div><span className={styles.green}></span> Vélo</div>
    </div>
  );
}
