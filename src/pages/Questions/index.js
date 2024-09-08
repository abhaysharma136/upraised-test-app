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
        "If a tree falls in a forest and no one is around to hear it, does it make a sound?",
      options: [
        { id: 1, value: "Yes" },
        { id: 2, value: "No" },
        { id: 3, value: "It depends on the type of tree" },
        { id: 4, value: "It depends on the environment" },
        { id: 5, value: "Not enough information" },
      ],
      answer: "Yes",
      image:
        "https://img.freepik.com/free-vector/isolated-tree-white-background_1308-26130.jpg",
    },
    {
      id: 2,
      question:
        "If you have a basket with 5 apples and you take away 3, how many apples do you have?",
      options: [
        { id: 1, value: "2" },
        { id: 2, value: "3" },
        { id: 3, value: "5" },
        { id: 4, value: "8" },
        { id: 5, value: "None" },
      ],
      answer: "3",
      image:
        "https://www.shutterstock.com/image-vector/vector-set-ripe-green-yellow-600nw-2471307839.jpg",
    },
    {
      id: 3,
      question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
      options: [
        { id: 1, value: "24" },
        { id: 2, value: "32" },
        { id: 3, value: "48" },
        { id: 4, value: "64" },
        { id: 5, value: "128" },
      ],
      answer: "32",
    },
    {
      id: 4,
      question:
        "A plane crashes on the border of the United States and Canada. Where do they bury the survivors?",
      options: [
        { id: 1, value: "United States" },
        { id: 2, value: "Canada" },
        { id: 3, value: "Both countries" },
        { id: 4, value: "Nowhere" },
        { id: 5, value: "Not enough information" },
      ],
      answer: "Nowhere",
      image: "https://clipart-library.com/image_gallery/n263260.png",
    },
    {
      id: 5,
      question: "If you multiply any number by zero, what is the result?",
      options: [
        { id: 1, value: "Zero" },
        { id: 2, value: "One" },
        { id: 3, value: "The original number" },
        { id: 4, value: "Negative number" },
        { id: 5, value: "Undefined" },
      ],
      answer: "Zero",
    },
    {
      id: 6,
      question: "Which month of the year has 28 days?",
      options: [
        { id: 1, value: "February" },
        { id: 2, value: "April" },
        { id: 3, value: "June" },
        { id: 4, value: "All of them" },
        { id: 5, value: "None" },
      ],
      answer: "All of them",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjk2MS0wMTY4LXAucG5n.png",
    },
    {
      id: 7,
      question:
        "In a group of people, if each person shakes hands with everyone else exactly once, and there are 10 people, how many handshakes occur?",
      options: [
        { id: 1, value: "45" },
        { id: 2, value: "55" },
        { id: 3, value: "90" },
        { id: 4, value: "100" },
        { id: 5, value: "120" },
      ],
      answer: "45",
    },
    {
      id: 8,
      question: "What has keys but can't open locks?",
      options: [
        { id: 1, value: "A piano" },
        { id: 2, value: "A map" },
        { id: 3, value: "A code" },
        { id: 4, value: "A book" },
        { id: 5, value: "A door" },
      ],
      answer: "A piano",
    },
    {
      id: 9,
      question:
        "If you drop a red stone into the blue sea, what will it become?",
      options: [
        { id: 1, value: "Red" },
        { id: 2, value: "Blue" },
        { id: 3, value: "Green" },
        { id: 4, value: "Wet" },
        { id: 5, value: "Disappeared" },
      ],
      answer: "Wet",
    },
    {
      id: 10,
      question: "If two's company and three's a crowd, what are four and five?",
      options: [
        { id: 1, value: "Nine" },
        { id: 2, value: "A group" },
        { id: 3, value: "An average" },
        { id: 4, value: "Eleven" },
        { id: 5, value: "Unclear" },
      ],
      answer: "Nine",
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
        {currentQuestionObject?.image ? (
          <div className={styles.questionImageContainer}>
            <img
              src={currentQuestionObject?.image}
              alt="image1"
              className={styles.questionImage}
            />
          </div>
        ) : null}

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
