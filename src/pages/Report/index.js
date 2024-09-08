import React from "react";
import styles from "../Report/report.module.css";
import ResponseBox from "../../components/ResponseBox";
import Button from "../../components/Button";
import CircularProgressBar from "../../components/Circlular Progress Bar";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/api";
export default function Report() {
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
  return (
    <div className={styles.reportMainDiv}>
      <div className={styles.innerLayout}>
        <h2>Your result</h2>
        <CircularProgressBar />
        <ResponseBox />
        <div onClick={() => startQuiz()}>
          <Button buttonText="Start Again" />
        </div>
      </div>
    </div>
  );
}
