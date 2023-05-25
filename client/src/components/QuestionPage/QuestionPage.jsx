import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import close from "../../assets/icons/close-24px.svg";
import { theme, endStyle } from "../../theme/theme";
import { ThemeProvider } from "@mui/material";
import "./QuestionPage.scss";

const QuestionPage = ({
  open,
  progressBarStyle,
  currentQuestion,
  quizData,
  handleClose,
  handlePreviousQuestion,
  handleNextQuestion,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open}>
        <Box sx={endStyle}>
          {quizData[currentQuestion - 1] && (
            <div className="modal">
              <div className="modal__top-bar">
                <div className="modal__close-icon" onClick={handleClose}>
                  <img src={close} alt="close icon" />
                </div>
                <div className="modal__progress-wrapper">
                  <div className="modal__progress-container">
                    <div className="modal__progress--default"></div>
                    <div
                      className="modal__progress--active"
                      style={progressBarStyle}
                    ></div>
                  </div>
                  <button
                    className="modal__progress--back"
                    onClick={handlePreviousQuestion}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="modal__answers-wrapper">
                <h3>{quizData[currentQuestion - 1].question}</h3>
                <div className="modal__answers">
                  {quizData[currentQuestion - 1].answers.map(
                    (answer, index) => (
                      <button
                        className="modal__answer"
                        onClick={() => handleNextQuestion(answer)}
                        key={index}
                      >
                        {answer}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default QuestionPage;
