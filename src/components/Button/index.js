import React from "react";
import styles from "../Button/button.module.css";
import RightArrow from "../../assets/icons/rightArrow.svg";
export default function Button({ buttonText }) {
  return (
    <button className={styles.button}>
      <span>{buttonText}</span>
      <img src={RightArrow} alt="arrow-right" />
    </button>
  );
}
