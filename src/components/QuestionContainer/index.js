import React from "react";
import styles from "../QuestionContainer/questionBox.module.css";
export default function QuestionBox({
  option,
  selectedOption,
  onOptionChange,
}) {
  return (
    <div className={styles.questionBox}>
      <input
        type="radio"
        id="option"
        name="option"
        value={option}
        checked={selectedOption === option}
        onChange={() => onOptionChange(option)}
      />
      <h3>{option}</h3>
    </div>
  );
}
