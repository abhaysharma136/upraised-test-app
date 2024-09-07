import React from "react";
import styles from "../QuestionContainer/questionBox.module.css";
export default function QuestionBox({ option }) {
  return (
    <div className={styles.questionBox}>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <h3>{option}</h3>
    </div>
  );
}
