import React from "react";
import CircularProgressBar from "../../components/Circlular Progress Bar";
import styles from "../Questions/questions.module.css";
import QuestionBox from "../../components/QuestionContainer";
import Button from "../../components/Button";
export default function Questions() {
  return (
    <div className={styles.questionMainDiv}>
      <CircularProgressBar />
      <div className={styles.innerLayout}>
        <h1>
          How do you judge what should be added in the next version of the app?
        </h1>
        <div className={styles.questionsContainer}>
          <QuestionBox option="Data Analysis" />
          <QuestionBox option="Copy from similar product" />
          <QuestionBox option="User’s feedback" />
          <QuestionBox option="Make a questionary" />
          <QuestionBox option="Personal feeling" />
        </div>
      </div>
      <Button buttonText="Next" />
    </div>
  );
}
