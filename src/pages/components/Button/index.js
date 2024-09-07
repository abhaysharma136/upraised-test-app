import React from "react";
import styles from "../Button/button.module.css";
export default function Button({ buttonText }) {
  return <button className={styles.button}>{buttonText}</button>;
}
