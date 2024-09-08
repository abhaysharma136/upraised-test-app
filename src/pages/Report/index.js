import React, { useEffect, useState } from "react";
import styles from "../Report/report.module.css";
import ResponseBox from "../../components/ResponseBox";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, postData } from "../../api/api";
import CircularPercentageBar from "../../components/Circular percentage Bar";

export default function Report() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null); // Store the session data

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

  const location = useLocation(); // Get the location object

  // Extract sessionId from query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionIdFromUrl = queryParams.get("sessionId");
    if (sessionIdFromUrl) {
      setSessionId(sessionIdFromUrl);
    }
  }, [location.search]);

  // Fetch the current session object
  const fetchSessionData = async () => {
    try {
      let response = await getData(`/feedback/${sessionId}`);
      setSessionData(response);
      console.log("Fetched session data:", response);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch session data when sessionId is available
  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  console.log("Session data fetched", sessionData);

  // Function to calculate the number of correct and wrong answers
  const getAnswerStats = (sessionData) => {
    // Check if sessionData and questionsData exist
    if (!sessionData || !sessionData.questionsData) {
      return { correctAnswers: 0, wrongAnswers: 0 }; // Return 0 if data is not available
    }

    const { questionsData } = sessionData;

    // Initialize counters
    let correctAnswers = 0;
    let wrongAnswers = 0;

    // Loop through the questions and count correct and wrong answers
    questionsData.forEach((question) => {
      if (question.isCorrect) {
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }
    });

    return { correctAnswers, wrongAnswers };
  };

  // Calculate answer stats if sessionData is available
  const answerStats = sessionData
    ? getAnswerStats(sessionData)
    : { correctAnswers: 0, wrongAnswers: 0 };
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
    <div className={styles.reportMainDiv}>
      <div className={styles.innerLayout}>
        <h2>Your result</h2>
        <div className={styles.resultCircularProgress}>
          <CircularPercentageBar
            progress={
              (answerStats.correctAnswers /
                (answerStats.correctAnswers + answerStats.wrongAnswers)) *
              100
            }
          />
        </div>

        <ResponseBox
          correctAnswers={answerStats.correctAnswers}
          wrongAnswers={answerStats.wrongAnswers}
        />

        <div onClick={() => handleSubmit()} className={styles.buttonContainer}>
          <Button buttonText="Start Again" />
        </div>
      </div>
    </div>
  );
}
