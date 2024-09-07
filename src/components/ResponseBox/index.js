import React from "react";
import styles from "../ResponseBox/responseBox.module.css";
export default function ResponseBox() {
  return (
    <div className={styles.responseBoxContainer}>
      <div className={styles.correctResponseContainer}>
        <div className={styles.correctIconDiv}></div>
        <h3>3</h3>
        <h3>Correct</h3>
      </div>
      <div className={styles.wrongResponseContainer}>
        <div className={styles.wrongIconDiv}></div>
        <h3>2</h3>
        <h3>Incorrect</h3>
      </div>
    </div>
  );
}
