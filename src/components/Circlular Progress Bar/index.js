import React from "react";
import styles from "../Circlular Progress Bar/Circularprogressbar.module.css";

export default function CircularProgressBar({
  progress,
  currentStep,
  totalSteps,
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
          <h1>{currentStep}</h1>
          <div className={styles.circularInnerDivSeperater}>/</div>
          <h3>{totalSteps}</h3>
        </div>
      </div>
    </div>
  );
}
