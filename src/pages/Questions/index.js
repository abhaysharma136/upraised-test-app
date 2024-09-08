import React, { useEffect, useState } from "react";
import CircularProgressBar from "../../components/Circlular Progress Bar";
import styles from "../Questions/questions.module.css";
import QuestionBox from "../../components/QuestionContainer";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, putData } from "../../api/api"; // Assume putData is your API function to send PUT requests

export default function Questions() {
  const navigate = useNavigate();
  const questionsData = [
    {
      id: 1,
      question:
        "How do you judge what should be added in the next version of the app?",
      options: [
        { id: 1, value: "Data Analysis" },
        { id: 2, value: "Copy from similar product" },
        { id: 3, value: "User’s feedback" },
        { id: 4, value: "Make a questionary" },
        { id: 5, value: "Personal feeling" },
      ],
      answer: "User’s feedback",
    },
    {
      id: 2,
      question:
        "How do you judge what should not be added in the next version of the app?",
      options: [
        { id: 1, value: "Data Analysis2" },
        { id: 2, value: "Copy from similar product2" },
        { id: 3, value: "User’s feedback2" },
        { id: 4, value: "Make a questionary2" },
        { id: 5, value: "Personal feeling2" },
      ],
      answer: "Copy from similar product2",
    },
  ];

  const location = useLocation(); // Get the location object
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null); // Store the session data
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Track the current question
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [startTime, setStartTime] = useState(new Date().getTime()); // Track question start time

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

  // Handle option selection
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Update the session with answers on each question submission
  const handleNextQuestion = async () => {
    if (!selectedOption) return; // Ensure the user has selected an option

    const endTime = new Date().getTime();
    const timeTaken = endTime - startTime;

    // Find the correct answer for the current question
    const currentQuestion = questionsData.find(
      (q) => q.id === currentQuestionId
    );
    const isCorrect = selectedOption === currentQuestion.answer;

    // Prepare the answer object for the current question
    const currentAnswer = {
      id: currentQuestionId,
      correct_value: selectedOption || "", // Use the selected option
      time_taken: timeTaken,
      isCorrect: isCorrect, // Add whether the answer is correct
    };

    // Initialize updatedQuestionsData to the existing questionsData from the session
    let updatedQuestionsData = sessionData?.questionsData || [];

    // Check if the question has already been answered
    const questionIndex = updatedQuestionsData.findIndex(
      (q) => q.id === currentQuestionId
    );

    if (questionIndex >= 0) {
      // If the question was already answered, update the existing entry
      updatedQuestionsData[questionIndex] = currentAnswer;
    } else {
      // If it's a new answer, add it to the array
      updatedQuestionsData.push(currentAnswer);
    }

    // Update the session data with the new questionsData array
    const updatedSessionData = {
      ...sessionData,
      questionsData: updatedQuestionsData,
    };

    try {
      // Send PUT request to update session
      await putData(`/feedback/${sessionId}`, updatedSessionData);
      console.log("Updated session data:", updatedSessionData);
    } catch (err) {
      console.error("Error updating session:", err);
    }

    // Move to the next question or navigate to the report
    if (currentQuestionId < questionsData.length) {
      setCurrentQuestionId(currentQuestionId + 1);
      setSelectedOption(null); // Reset the selected option for the next question
      setStartTime(new Date().getTime()); // Reset start time for next question
    } else {
      navigate(`/report?sessionId=${sessionId}`);
    }
  };

  // Find the current question object
  const currentQuestionObject = questionsData.find(
    (q) => q.id === currentQuestionId
  );

  return (
    <div className={styles.questionMainDiv}>
      <div className={styles.circularProgressBarContainer}>
        <CircularProgressBar
          progress={(currentQuestionId / questionsData.length) * 100}
          currentStep={currentQuestionId}
          totalSteps={questionsData.length}
        />
      </div>
      <div className={styles.innerLayout}>
        <h1>{currentQuestionObject?.question}</h1>
        <div className={styles.questionsContainer}>
          {currentQuestionObject.options?.map((option, optionIndex) => (
            <QuestionBox
              option={option?.value}
              key={optionIndex}
              selectedOption={selectedOption}
              onOptionChange={handleOptionChange}
              value={option?.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer} onClick={handleNextQuestion}>
        {/* Disable the button if no option is selected */}
        <Button buttonText="Next" disabled={!selectedOption} />
      </div>
    </div>
  );
}
