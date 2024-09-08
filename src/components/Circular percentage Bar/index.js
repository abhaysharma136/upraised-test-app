import React from "react";
import styles from "../Circular percentage Bar/CircularPercentageBar.module.css";

export default function CircularPercentageBar({
  progress,   // Progress value should be between 0 and 100
}) {
  return (
    <div className={styles.circularOuterContainer}>
      <div
        className={styles.circularOuterDiv}
        style={{
          background: `conic-gradient(#44B77B ${
            progress * 3.6
          }deg, #F3F4FA 0deg)`,
        }}
      >
        <div className={styles.circularInnerDiv}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
