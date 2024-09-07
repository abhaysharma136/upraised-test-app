import React from "react";
import Button from "../components/Button";
import styles from "../Home/home.module.css";
import logo from "../../assets/images/upraisedLogo.png";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <img src={logo} alt="logo" className={styles.logoImage} />
      <div className={styles.quizCircle}>Quiz</div>
      <div onClick={() => navigate("/questions")}>
        <Button buttonText="Start" />
      </div>
    </div>
  );
}
