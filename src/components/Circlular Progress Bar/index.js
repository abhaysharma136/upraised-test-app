import React from "react";
import styles from "../Circlular Progress Bar/Circularprogressbar.module.css";
export default function CircularProgressBar() {
  return (
    <div className={styles.circularOuterContainer}>
      <div className={styles.circularOuterDiv}>
        <div className={styles.circularInnerDiv}>1/5</div>
      </div>
    </div>
  );
}
