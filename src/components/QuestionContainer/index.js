import React from "react";
import styles from "../QuestionContainer/questionBox.module.css";
export default function QuestionBox({
  option,
  selectedOption,
  onOptionChange,
  value,
}) {
  return (
    <label
      // className={styles.questionBox}
      onClick={() => onOptionChange(option)}
    >
      <div className={styles.questionBox}>
        <input
          type="radio"
          id="option"
          name="option"
          value={value}
          checked={selectedOption === option}
          onChange={() => onOptionChange(option)}
        />
        <h3>{option}</h3>
      </div>
    </label>
  );
}
