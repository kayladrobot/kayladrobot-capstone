import * as React from "react";
import { useState, useEffect } from "react";
import "./Quiz.scss";

// // ------ import api base URL -------
import apiData from "../../data/apiData";
import QuestionPage from "../QuestionPage/QuestionPage"
import SubmitPage from "../QuestionSubmit/QuestionSubmit"

function Quiz({ open, handleClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizData, setquizData] = useState([]);
  const [quizCompleted, isQuizCompleted] = useState(false);

  // -----  useEffect/ apiData -----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/quiz-for-employeers");
        const quizResponse = response.data;
        setquizData(quizResponse);
        setCurrentQuestion(1);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  const totalQuestions = quizData.length;
  const progress = Math.round((currentQuestion / totalQuestions) * 100 * 0.9);
  const progressBarStyle = {
    width: `${progress}%`,
  };

  const handleNextQuestion = (selectedAnswer) => {
    setSelectedAnswers([...selectedAnswers, selectedAnswer]);
    if (currentQuestion === totalQuestions) {
      isQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = (event) => {
    if (currentQuestion === 1) {
      return handleClose();
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <>
      {quizCompleted ? (
        <SubmitPage selectedAnswers={selectedAnswers} open={open} handleClose={handleClose} quizData={quizData}/>
      ) : (
        <QuestionPage 
          progressBarStyle={progressBarStyle}
          handleNextQuestion={handleNextQuestion}
          open={open}
          quizData={quizData}
          handlePreviousQuestion={handlePreviousQuestion}
          handleClose={handleClose}
          currentQuestion={currentQuestion}
        />
      )}a
    </>
  );
}

export default Quiz;