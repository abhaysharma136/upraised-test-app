import React from "react";
import Button from "../../components/Button";
import styles from "../Home/home.module.css";
import logo from "../../assets/images/upraisedLogo.png";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/api";
export default function Home() {
  const navigate = useNavigate();
  const startQuiz = async () => {
    try {
      let response = await postData("/session", {
        user_id: "First User",
        quiz_id: "Real_Test1",
      });
      const quizSessionId = response.id;
      navigate(`/questions?sessionId=${quizSessionId}`);
    } catch (err) {
      console.error("Error starting the quiz", err);
    }
  };

  //Initialize the quiz
  const date = new Date();
  const startTime = date.getTime();
  const initializeQuiz = async () => {
    try {
      await postData("/feedback", {
        user_id: 45,
        questionsData: [],
        start_data: startTime,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    startQuiz();
    initializeQuiz();
  };
  return (
    <div className={styles.pageContainer}>
      <img src={logo} alt="logo" className={styles.logoImage} />
      <div className={styles.quizCircle}>Quiz</div>
      <div onClick={() => handleSubmit()} className={styles.buttonContainer}>
        <Button buttonText="Start" />
      </div>
    </div>
  );
}
