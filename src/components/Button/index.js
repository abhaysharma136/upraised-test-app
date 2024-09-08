import React from "react";
import styles from "../Button/button.module.css";
import RightArrow from "../../assets/icons/rightArrow.svg";
export default function Button({ buttonText, disabled }) {
  return (
    <button className={styles.button} disabled={disabled}>
      <span>{buttonText}</span>
      {buttonText !== "Start" || "Start Again" ? (
        <img src={RightArrow} alt="arrow-right" />
      ) : (
        ""
      )}
    </button>
  );
}
