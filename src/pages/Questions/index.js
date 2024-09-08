import React, { useEffect, useState } from "react";
import CircularProgressBar from "../../components/Circlular Progress Bar";
import styles from "../Questions/questions.module.css";
import QuestionBox from "../../components/QuestionContainer";
import Button from "../../components/Button";
import { getData, postData } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const navigate = useNavigate();
  const questionsData = [
    {
      id: 1,
      question:
        "How do you judge what should be added in the next version of the app?",
      options: [
        {
          id: 1,
          value: "Data Analysis",
        },
        {
          id: 2,
          value: "Copy from similar product",
        },
        {
          id: 3,
          value: "User’s feedback",
        },
        {
          id: 4,
          value: "Make a questionary",
        },
        {
          id: 5,
          value: "Personal feeling",
        },
      ],
    },
    {
      id: 2,
      question:
        "How do you judge what should not be added in the next version of the app?",
      options: [
        {
          id: 1,
          value: "Data Analysis2",
        },
        {
          id: 2,
          value: "Copy from similar product2",
        },
        {
          id: 3,
          value: "User’s feedback2",
        },
        {
          id: 4,
          value: "Make a questionary2",
        },
        {
          id: 5,
          value: "Personal feeling2",
        },
      ],
    },
  ];

  let [currentQuestionId, setCurrentQuestionId] = useState(1); //Track the current question
  const [ifExists, setIfExists] = useState();
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
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
  let checkIfExists = async () => {
    try {
      let response = await getData("/feedback");
      setIfExists(response?.id);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    checkIfExists();
    if (ifExists) {
      initializeQuiz();
    }
  }, []);

  // handle the logic for next questions button
  const handleNextQuestion = () => {
    if (currentQuestionId < questionsData.length) {
      setCurrentQuestionId(currentQuestionId + 1);
      console.log("answer", selectedOption);
    } else {
      console.log("answer", selectedOption);
      navigate("/report");
    }
  };

  let currentQuestionObject = questionsData.find(
    (q) => q.id === currentQuestionId
  );

  // Handle option selection
  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  //handleUpdate Answer

  return (
    <div className={styles.questionMainDiv}>
      <div className={styles.circularProgressBarContainer}>
        <CircularProgressBar />
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
            />
          ))}
        </div>
      </div>
      <div
        onClick={() => handleNextQuestion()}
        className={styles.buttonContainer}
      >
        <Button buttonText="Next" />
      </div>
    </div>
  );
}
