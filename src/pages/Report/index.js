import React from "react";
import styles from "../Report/report.module.css";
import ResponseBox from "../../components/ResponseBox";
import Button from "../../components/Button";
import CircularProgressBar from "../../components/Circlular Progress Bar";
export default function Report() {
  return (
    <div className={styles.reportMainDiv}>
      <div className={styles.innerLayout}>
        <h2>Your result</h2>
        <CircularProgressBar />
        <ResponseBox />
        <Button buttonText="Start Again" />
      </div>
    </div>
  );
}
